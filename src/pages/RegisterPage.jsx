import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/authUser/reducer';
import './AuthPage.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (_error) {
      // error notification handled by thunk
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-brand-title">
            Developer
            <br />
            Forum
          </div>
          <div className="auth-brand-subtitle">
            Bergabunglah dengan komunitas developer Indonesia untuk berbagi ide dan berdiskusi.
          </div>
        </div>
        <div className="auth-form-panel">
          <div className="auth-form-title">Daftar</div>
          <div className="auth-form-subtitle">Buat akun baru untuk mulai berdiskusi</div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="name" className="auth-label">Nama</label>
              <input
                id="name"
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit">
              Daftar
            </button>
          </form>
          <p className="auth-footer">
            Sudah punya akun?
            {' '}
            <Link to="/login">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
