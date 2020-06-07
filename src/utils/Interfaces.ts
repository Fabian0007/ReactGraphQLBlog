export interface IAuthor {
  website: string,
  firstName: string,
  lastName: string
}

export interface IArticle {
 authorId?: string,
 title: string,
 author: IAuthor,
 date?: Date,
 body: string,
 id: number
}

export interface IArticleRow extends IArticle{
    onClick: (articleId: number) => void
}

export interface IResponseAuthorId {
    id: string
}