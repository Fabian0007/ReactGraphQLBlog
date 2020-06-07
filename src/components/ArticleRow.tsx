import React from 'react';
import { IArticleRow } from '../utils/Interfaces';


const ArticleRow : React.FC<IArticleRow> = (props) =>  {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.onClick(props.id);
  };
  return (
    <div className="article-row link" onClick={handleClick}>
      <div className="article-title">{props.title}</div>
      <div className="article-date">{props.date}</div>
    </div>
  );
}

export const ArticleRowGraphQL = `
  fragment ArticleRowFragment on Article {
    id
    title
    date
  }
`;

export default ArticleRow;
