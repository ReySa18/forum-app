import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(_state, action) {
      const { message, type = 'success' } = action.payload;
      nextId += 1;
      return { id: nextId, message, type };
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = ({ message, type = 'success' }) => (dispatch) => {
  dispatch(setNotification({ message, type }));
};

export default notificationSlice.reducer;
