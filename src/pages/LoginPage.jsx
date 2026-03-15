import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncLoginUser } from '../states/authUser/reducer';
import './AuthPage.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncLoginUser({ email, password }));
      navigate('/');
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
            Tempat berbagi ide, bertanya, dan berdiskusi dengan komunitas developer Indonesia.
          </div>
        </div>
        <div className="auth-form-panel">
          <div className="auth-form-title">Masuk</div>
          <div className="auth-form-subtitle">Masuk ke akun Anda untuk melanjutkan</div>
          <form className="auth-form" onSubmit={handleSubmit}>
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
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit">
              Masuk
            </button>
          </form>
          <p className="auth-footer">
            Belum punya akun?
            {' '}
            <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
