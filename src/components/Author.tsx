import React from 'react';
import { IAuthor } from '../utils/Interfaces';

const Author: React.FC<IAuthor> = (props) => {
  return (
    <div className="article-author">
      By: <a href={props.website}>{props.firstName} {props.lastName}</a>
    </div>
  );
}

export const AuthorGraphQL = `
  fragment AuthorFragment on Author {
    firstName
    lastName
    website
  }
`;

export default Author;
