import { createSlice } from '@reduxjs/toolkit';

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    setLoading(_state, action) {
      return action.payload;
    },
  },
});

export const { setLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
