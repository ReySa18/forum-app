/**
 * Test scenarios for authUserReducer
 *
 * - Reducer function
 *   - should return the initial state (null) when given an unknown action
 *   - setAuthUser action
 *     - should set the authenticated user with the given payload
 *   - unsetAuthUser action
 *     - should clear the authenticated user back to null
 *
 * - Thunk function
 *   - asyncLoginUser
 *     - should dispatch setAuthUser with user data and success notification on success
 *     - should dispatch error notification and throw when login fails
 *   - asyncRegisterUser
 *     - should dispatch success notification when registration succeeds
 *     - should dispatch error notification and throw when registration fails
 */

import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authUserReducer, {
  setAuthUser,
  unsetAuthUser,
  asyncLoginUser,
  asyncRegisterUser,
} from './reducer';
import isLoadingReducer from '../isLoading/reducer';
import notificationReducer from '../notification/reducer';

vi.mock('../../utils/api');

describe('authUserReducer', () => {
  it('should return the initial state (null) when given an unknown action', () => {
    const state = authUserReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toBeNull();
  });

  describe('setAuthUser action', () => {
    it('should set the authenticated user with the given payload', () => {
      const user = { id: 'user-1', name: 'John', email: 'john@test.com' };
      const state = authUserReducer(null, setAuthUser(user));
      expect(state).toEqual(user);
    });
  });

  describe('unsetAuthUser action', () => {
    it('should clear the authenticated user back to null', () => {
      const prevState = { id: 'user-1', name: 'John', email: 'john@test.com' };
      const state = authUserReducer(prevState, unsetAuthUser());
      expect(state).toBeNull();
    });
  });
});

describe('authUser thunks', () => {
  let store;
  let apiModule;

  beforeEach(async () => {
    apiModule = await import('../../utils/api');
    vi.restoreAllMocks();
    store = configureStore({
      reducer: {
        authUser: authUserReducer,
        isLoading: isLoadingReducer,
        notification: notificationReducer,
      },
    });
  });

  describe('asyncLoginUser', () => {
    it('should dispatch setAuthUser and success notification on success', async () => {
      const fakeUser = {
        id: 'user-1', name: 'John Doe', email: 'john@test.com',
      };
      apiModule.login = vi.fn(() => Promise.resolve('fake-token'));
      apiModule.putAccessToken = vi.fn();
      apiModule.getOwnProfile = vi.fn(() => Promise.resolve(fakeUser));

      await store.dispatch(
        asyncLoginUser({ email: 'john@test.com', password: 'password' }),
      );

      const state = store.getState();
      expect(state.authUser).toEqual(fakeUser);
      expect(state.notification.type).toBe('success');
      expect(state.isLoading).toBe(false);
      expect(apiModule.putAccessToken).toHaveBeenCalledWith('fake-token');
    });

    it('should dispatch error notification and throw when login fails', async () => {
      apiModule.login = vi.fn(
        () => Promise.reject(new Error('Login gagal')),
      );

      await expect(
        store.dispatch(
          asyncLoginUser({ email: 'wrong@test.com', password: 'wrong' }),
        ),
      ).rejects.toThrow('Login gagal');

      const state = store.getState();
      expect(state.authUser).toBeNull();
      expect(state.notification.type).toBe('error');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('asyncRegisterUser', () => {
    it('should dispatch success notification when registration succeeds', async () => {
      apiModule.register = vi.fn(() => Promise.resolve({
        id: 'user-new', name: 'New User', email: 'new@test.com',
      }));

      await store.dispatch(
        asyncRegisterUser({
          name: 'New User', email: 'new@test.com', password: 'password',
        }),
      );

      const state = store.getState();
      expect(state.notification.type).toBe('success');
      expect(state.notification.message).toContain('Registrasi berhasil');
    });

    it('should dispatch error notification and throw when registration fails', async () => {
      apiModule.register = vi.fn(
        () => Promise.reject(new Error('Email sudah terdaftar')),
      );

      await expect(
        store.dispatch(
          asyncRegisterUser({
            name: 'Dup', email: 'dup@test.com', password: 'password',
          }),
        ),
      ).rejects.toThrow('Email sudah terdaftar');

      const state = store.getState();
      expect(state.notification.type).toBe('error');
    });
  });
});
