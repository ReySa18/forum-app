import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { setLoading } from '../isLoading/reducer';
import { showNotification } from '../notification/reducer';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    list: [],
    category: '',
  },
  reducers: {
    setThreads(state, action) {
      state.list = action.payload;
    },
    addThread(state, action) {
      state.list.unshift(action.payload);
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    toggleUpVoteThread(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.list.find((t) => t.id === threadId);
      if (thread) {
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        if (thread.upVotesBy.includes(userId)) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
        }
      }
    },
    toggleDownVoteThread(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.list.find((t) => t.id === threadId);
      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        if (thread.downVotesBy.includes(userId)) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
        }
      }
    },
  },
});

export const {
  setThreads,
  addThread,
  setCategory,
  toggleUpVoteThread,
  toggleDownVoteThread,
} = threadsSlice.actions;

export const asyncGetThreads = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const threads = await api.getAllThreads();
    dispatch(setThreads(threads));
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncCreateThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThread(thread));
    dispatch(showNotification({ message: 'Thread berhasil dibuat!', type: 'success' }));
    return thread;
  } catch (error) {
    dispatch(showNotification({
      message: error.message || 'Gagal membuat thread.',
      type: 'error',
    }));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) return;
  dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
  try {
    await api.upVoteThread(threadId);
  } catch (_error) {
    dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
  }
};

export const asyncDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) return;
  dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
  try {
    await api.downVoteThread(threadId);
  } catch (_error) {
    dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
  }
};

export const asyncNeutralVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) return;
  const { threads } = getState();
  const thread = threads.list.find((t) => t.id === threadId);
  if (!thread) return;
  const wasUpVoted = thread.upVotesBy.includes(authUser.id);
  const wasDownVoted = thread.downVotesBy.includes(authUser.id);
  if (wasUpVoted) {
    dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
  } else if (wasDownVoted) {
    dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
  }
  try {
    await api.neutralVoteThread(threadId);
  } catch (_error) {
    if (wasUpVoted) {
      dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
    } else if (wasDownVoted) {
      dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
    }
  }
};

export default threadsSlice.reducer;
