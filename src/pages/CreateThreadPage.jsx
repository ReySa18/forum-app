import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncCreateThread } from '../states/threads/reducer';
import './CreateThreadPage.css';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  if (!authUser) {
    return (
      <div className="create-thread-container">
        <p className="create-thread-login-hint">
          Silakan
          {' '}
          <Link to="/login">login</Link>
          {' '}
          untuk membuat thread baru.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      return;
    }
    try {
      await dispatch(asyncCreateThread({ title, body, category }));
      navigate('/');
    } catch (_error) {
      // error notification handled by thunk
    }
  };

  return (
    <div className="create-thread-container">
      <h1 className="create-thread-title">Buat Thread Baru</h1>
      <div className="create-thread-card">
        <form className="create-thread-form" onSubmit={handleSubmit}>
          <div className="create-thread-field">
            <label htmlFor="title" className="create-thread-label">Judul</label>
            <input
              id="title"
              type="text"
              placeholder="Judul thread"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="create-thread-field">
            <label htmlFor="category" className="create-thread-label">Kategori (opsional)</label>
            <input
              id="category"
              type="text"
              placeholder="Contoh: react, javascript"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="create-thread-field">
            <label htmlFor="body" className="create-thread-label">Isi Thread</label>
            <textarea
              id="body"
              className="create-thread-textarea"
              placeholder="Tulis isi thread Anda..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="create-thread-actions">
            <Link to="/" className="create-thread-cancel">Batal</Link>
            <button type="submit" className="create-thread-submit">
              Buat Thread
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
