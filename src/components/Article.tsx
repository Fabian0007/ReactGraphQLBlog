import React from 'react';
import { IAuthor, IArticle } from '../utils/Interfaces';

import Author, { AuthorGraphQL } from './Author';

const Article: React.FC<IArticle> = (props) =>  {
    if (!props.title) {
      return <h3>Select an Article</h3>;
    }
    return (
      <div id="current-article">
        <h3>{props.title}</h3>
        <div className="article-date">
          {props.date}
        </div>
        <Author {...props.author} />
        <div className="article-body">
          {props.body}
        </div>
      </div>
    );
}

export const ArticleGraphQL = `
  fragment ArticleFragment on Article {
    title
    date
    body
    author {
      ...AuthorFragment
    }
  }
  ${AuthorGraphQL}
`;

export default Article;
