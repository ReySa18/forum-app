import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLogoutUser } from '../states/authUser/reducer';
import './Navbar.css';

function Navbar({ authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">Developer Forum</Link>

        {/* Desktop nav links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Threads</Link>
          <Link to="/leaderboard" className="navbar-link">Leaderboard</Link>
          {authUser ? (
            <div className="navbar-user">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="navbar-avatar"
              />
              <span className="navbar-username">{authUser.name}</span>
              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="navbar-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="navbar-mobile-panel">
          <Link to="/" className="navbar-mobile-link" onClick={closeMenu}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Threads
          </Link>
          <Link to="/leaderboard" className="navbar-mobile-link" onClick={closeMenu}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 21v-6M12 21V3M16 21v-4M4 21h16" />
            </svg>
            Leaderboard
          </Link>
          <div className="navbar-mobile-divider" />
          {authUser ? (
            <>
              <div className="navbar-mobile-user">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="navbar-mobile-user-avatar"
                />
                <span className="navbar-mobile-user-name">{authUser.name}</span>
              </div>
              <button
                type="button"
                className="navbar-mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-mobile-link" onClick={closeMenu}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
              Login
            </Link>
          )}
        </div>
        <button
          type="button"
          className="navbar-mobile-backdrop"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      </div>
    </nav>
  );
}

export default Navbar;
