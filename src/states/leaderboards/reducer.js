import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { setLoading } from '../isLoading/reducer';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    setLeaderboards(_state, action) {
      return action.payload;
    },
  },
});

export const { setLeaderboards } = leaderboardsSlice.actions;

export const asyncGetLeaderboards = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(setLeaderboards(leaderboards));
  } finally {
    dispatch(setLoading(false));
  }
};

export default leaderboardsSlice.reducer;
