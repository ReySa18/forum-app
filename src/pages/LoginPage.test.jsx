/**
 * Test scenarios for LoginPage component
 *
 * - should render the login form with email, password, and submit button
 * - should allow user to type email and password
 * - should dispatch asyncLoginUser and navigate on successful submit
 * - should show a link to the register page
 */

import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import authUserReducer from '../states/authUser/reducer';
import isLoadingReducer from '../states/isLoading/reducer';
import notificationReducer from '../states/notification/reducer';

// Mock the thunk
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../states/authUser/reducer', async () => {
  const actual = await vi.importActual('../states/authUser/reducer');
  return {
    ...actual,
    asyncLoginUser: vi.fn(),
  };
});

function renderLoginPage(store) {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );
}

describe('LoginPage component', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        authUser: authUserReducer.default || authUserReducer,
        isLoading: isLoadingReducer,
        notification: notificationReducer,
      },
    });
  });

  it('should render login form with email, password, and submit button', () => {
    renderLoginPage(store);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /masuk/i }),
    ).toBeInTheDocument();
  });

  it('should allow user to type email and password', async () => {
    renderLoginPage(store);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should dispatch asyncLoginUser and navigate on successful submit', async () => {
    const { asyncLoginUser } = await import('../states/authUser/reducer');
    // Make asyncLoginUser return a thunk that resolves
    asyncLoginUser.mockReturnValue(() => Promise.resolve());

    renderLoginPage(store);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /masuk/i }));

    expect(asyncLoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should show a link to the register page', () => {
    renderLoginPage(store);

    const registerLink = screen.getByRole('link', { name: /daftar di sini/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
