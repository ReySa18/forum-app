import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { setLoading } from '../isLoading/reducer';
import { showNotification } from '../notification/reducer';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser(_state, action) {
      return action.payload;
    },
    unsetAuthUser() {
      return null;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export const asyncRegisterUser = ({ name, email, password }) => async (dispatch) => {
  try {
    await api.register({ name, email, password });
    dispatch(showNotification({
      message: 'Registrasi berhasil! Silakan login.',
      type: 'success',
    }));
  } catch (error) {
    dispatch(showNotification({
      message: error.message || 'Registrasi gagal. Coba lagi.',
      type: 'error',
    }));
    throw error;
  }
};

export const asyncLoginUser = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const user = await api.getOwnProfile();
    dispatch(setAuthUser(user));
    dispatch(showNotification({
      message: `Login berhasil! Selamat datang, ${user.name}.`,
      type: 'success',
    }));
  } catch (error) {
    dispatch(showNotification({
      message: error.message || 'Login gagal. Periksa email dan password.',
      type: 'error',
    }));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncPreloadUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = api.getAccessToken();
    if (token) {
      const user = await api.getOwnProfile();
      dispatch(setAuthUser(user));
    }
  } catch (_error) {
    api.removeAccessToken();
    dispatch(setAuthUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncLogoutUser = () => (dispatch) => {
  api.removeAccessToken();
  dispatch(unsetAuthUser());
  dispatch(showNotification({ message: 'Berhasil logout.', type: 'info' }));
};

export default authUserSlice.reducer;
