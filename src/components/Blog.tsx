import React, { useEffect } from 'react';
import '../style.css'

import ArticleList, { ArticleListGraphQL } from './ArticleList';
import Article, { ArticleGraphQL } from './Article';
import NewArticleForm from './NewArticleForm';
import { IAuthor, IArticle, IResponseAuthorId } from '../utils/Interfaces';

import * as api from '../api';

const Blog : React.FC = () => {
  
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const [currentArticle, setCurrentArticle] = React.useState<IArticle>();
  const [newArticleForm, setNewArticleForm] = React.useState<boolean>(false);
  
  
  useEffect(() => {
      api.sendOperation('GetArticleList').then((articleList: IArticle[]) => {
        setArticles(articleList);
      });
  }, [])

  const changeCurrentArticle = (articleId: number) => {
    api.sendOperation('GetArticle', { articleId }).then((article: IArticle )=> {
      setCurrentArticle(article);
    });
  };

  const showNewArticleForm = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setNewArticleForm(true);
  }

  const addArticle = (userInput: IArticle) => {
    const { author: authorInput, ...articleInput } = userInput;
    api.sendOperation('FindOrCreateAuthor', {
      input: authorInput
    }).then((author : IResponseAuthorId) => {
      articleInput.authorId = author.id;
      articleInput.date = new Date();
      return api.sendOperation('CreateArticle', {
        input: articleInput
      });
    }).then((newArticle: IArticle) => {
      setArticles([...articles, newArticle]);
      setCurrentArticle(newArticle);
      setNewArticleForm(false);
    });
  };

  return (
    <div className="App">
      <h2 id="header">GraphQL React Blog</h2>

      <div id="left">
        <h3>Article List</h3>
        <ArticleList
          articles={articles}
          onArticleClick={changeCurrentArticle}
        />

        <button id="new-article" className="btn btn-secondary" type="button" onClick={showNewArticleForm}>
          New Article
        </button>
      </div>

      <div id="right">
        {
          newArticleForm ?
            <NewArticleForm addArticle={addArticle} /> :
            <Article {...currentArticle} />
        }
      </div>

    </div>
  );
}

export const BlogGraphQL = `
  query GetArticleList($apiKey: String!) {
    viewer(apiKey: $apiKey) {
      data: articles {
        ...ArticleListFragment
      }
    }
  }
  
  query GetArticle($apiKey: String!, $articleId: String!) {
    viewer(apiKey: $apiKey) {
      data: findArticle(id: $articleId) {
        ...ArticleFragment
      }
    }
  }
  
  mutation FindOrCreateAuthor(
  $apiKey: String!, 
  $input: AuthorOptionalInput!
  ) {
    mutationData: findOrCreateAuthor(
      apiKey: $apiKey,
      input: $input,
      findFields: ["firstName", "lastName", "website"],
    ) {
      id
    }
  }
  
  mutation CreateArticle(
  $apiKey: String!,
  $input: ArticleInput!
  ) {
    mutationData: createArticle(
      apiKey: $apiKey,
      input: $input
    ) {
      id
      ...ArticleFragment
    }
  }
  ${ArticleListGraphQL}
  ${ArticleGraphQL}
`;

export default Blog;
