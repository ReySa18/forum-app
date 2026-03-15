import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { setLoading } from '../isLoading/reducer';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const asyncGetUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const users = await api.getAllUsers();
    dispatch(setUsers(users));
  } finally {
    dispatch(setLoading(false));
  }
};

export default usersSlice.reducer;
