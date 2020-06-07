import React, { useRef} from 'react';
import { IArticle } from '../utils/Interfaces';

interface NewArticleFormProps {
  addArticle: (article: IArticle) => void
}

const NewArticleForm : React.FC<NewArticleFormProps> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const authorFirstNameInput = useRef<HTMLInputElement>(null);
  const authorLastNameInput = useRef<HTMLInputElement>(null);
  const authorWebsiteInput = useRef<HTMLInputElement>(null);
  const bodyInput = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    props.addArticle({
      title: titleInput.current.value,
      id: 0,
      author: {
        firstName: authorFirstNameInput.current.value,
        lastName: authorLastNameInput.current.value,
        website: authorWebsiteInput.current.value,
      },
      body: bodyInput.current.value,
    });
  }
  return (
    <div id="new-article-form">
      <h3>New Article</h3>

      <form onSubmit={handleSubmit}>
        <input
          ref={titleInput}
          className="form-control"
          placeholder="Article Title" />
        <br />
        <input
          ref={authorFirstNameInput}
          className="form-control"
          placeholder="Author First Name" />
        <br />
        <input
          ref={authorLastNameInput}
          className="form-control"
          placeholder="Author Last Name" />
        <br />
        <input
          ref={authorWebsiteInput}
          className="form-control"
          placeholder="Author Website" />
        <br />
        <textarea
          ref={bodyInput}
          className="form-control"
          rows={20}
          placeholder="Article Body"></textarea>
        <br />
        <button type="submit" className="btn btn-secondary">
          Add Article
        </button>
      </form>
    </div>
  );
}

export default NewArticleForm;
