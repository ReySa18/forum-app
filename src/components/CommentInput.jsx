import { useState } from 'react';
import './CommentInput.css';

function CommentInput({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <form className="comment-input-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input-textarea"
        placeholder="Tulis komentar..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="comment-input-submit">
        Kirim Komentar
      </button>
    </form>
  );
}

export default CommentInput;
