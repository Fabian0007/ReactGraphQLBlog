import React from 'react';

import ArticleRow, { ArticleRowGraphQL } from './ArticleRow';
import { IArticle } from '../utils/Interfaces';

interface ArticleListProps {
  articles: IArticle[],
  onArticleClick: (articleId: number) => void
}

const ArticleList : React.FC<ArticleListProps> = (props) => {
  const { articles, onArticleClick } = props;
  return (
    <div className="article-list">
      {articles.map(article =>
        <ArticleRow
          onClick={onArticleClick}
          key={article.id}
          {...article}
        />
      )}
    </div>
  );
}

export const ArticleListGraphQL = `
  fragment ArticleListFragment on Article {
    id
    ...ArticleRowFragment
  }
  ${ArticleRowGraphQL}
`;

export default ArticleList;
