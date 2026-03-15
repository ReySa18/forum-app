import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../states/notification/reducer';
import './Toast.css';

const ICONS = {
  success: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const TITLES = {
  success: 'Berhasil',
  error: 'Gagal',
  info: 'Info',
};

function Toast() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      dispatch(clearNotification());
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    if (!notification) return undefined;

    const timer = setTimeout(() => {
      dismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, dismiss]);

  if (!notification) return null;

  const { type, message } = notification;

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}${exiting ? ' toast-exit' : ''}`}>
        <div className="toast-icon">
          {ICONS[type]}
        </div>
        <div className="toast-body">
          <span className="toast-title">{TITLES[type]}</span>
          <span className="toast-message">{message}</span>
        </div>
        <button
          type="button"
          className="toast-close"
          onClick={dismiss}
          aria-label="Close notification"
        >
          <svg
            width="14"
            height="14"
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
        </button>
      </div>
    </div>
  );
}

export default Toast;
