import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { setLoading } from '../isLoading/reducer';
import { showNotification } from '../notification/reducer';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    setThreadDetail(_state, action) {
      return action.payload;
    },
    clearThreadDetail() {
      return null;
    },
    addComment(state, action) {
      if (state) {
        state.comments.unshift(action.payload);
      }
    },
    toggleUpVoteDetail(state, action) {
      if (!state) return;
      const { userId } = action.payload;
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      if (state.upVotesBy.includes(userId)) {
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      } else {
        state.upVotesBy.push(userId);
      }
    },
    toggleDownVoteDetail(state, action) {
      if (!state) return;
      const { userId } = action.payload;
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      if (state.downVotesBy.includes(userId)) {
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      } else {
        state.downVotesBy.push(userId);
      }
    },
    toggleUpVoteComment(state, action) {
      if (!state) return;
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        if (comment.upVotesBy.includes(userId)) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        } else {
          comment.upVotesBy.push(userId);
        }
      }
    },
    toggleDownVoteComment(state, action) {
      if (!state) return;
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        if (comment.downVotesBy.includes(userId)) {
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        } else {
          comment.downVotesBy.push(userId);
        }
      }
    },
  },
});

export const {
  setThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpVoteDetail,
  toggleDownVoteDetail,
  toggleUpVoteComment,
  toggleDownVoteComment,
} = threadDetailSlice.actions;

export const asyncGetThreadDetail = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearThreadDetail());
  try {
    const detail = await api.getThreadDetail(id);
    dispatch(setThreadDetail(detail));
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncCreateComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const comment = await api.createComment({ threadId, content });
    dispatch(addComment(comment));
    dispatch(showNotification({ message: 'Komentar berhasil dikirim!', type: 'success' }));
  } catch (error) {
    dispatch(showNotification({
      message: error.message || 'Gagal mengirim komentar.',
      type: 'error',
    }));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncUpVoteDetailThread = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser || !threadDetail) return;
  dispatch(toggleUpVoteDetail({ userId: authUser.id }));
  try {
    await api.upVoteThread(threadDetail.id);
  } catch (_error) {
    dispatch(toggleUpVoteDetail({ userId: authUser.id }));
  }
};

export const asyncDownVoteDetailThread = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser || !threadDetail) return;
  dispatch(toggleDownVoteDetail({ userId: authUser.id }));
  try {
    await api.downVoteThread(threadDetail.id);
  } catch (_error) {
    dispatch(toggleDownVoteDetail({ userId: authUser.id }));
  }
};

export const asyncNeutralVoteDetailThread = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser || !threadDetail) return;
  const wasUpVoted = threadDetail.upVotesBy.includes(authUser.id);
  const wasDownVoted = threadDetail.downVotesBy.includes(authUser.id);
  if (wasUpVoted) {
    dispatch(toggleUpVoteDetail({ userId: authUser.id }));
  } else if (wasDownVoted) {
    dispatch(toggleDownVoteDetail({ userId: authUser.id }));
  }
  try {
    await api.neutralVoteThread(threadDetail.id);
  } catch (_error) {
    if (wasUpVoted) {
      dispatch(toggleUpVoteDetail({ userId: authUser.id }));
    } else if (wasDownVoted) {
      dispatch(toggleDownVoteDetail({ userId: authUser.id }));
    }
  }
};

export const asyncUpVoteCommentDetail = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser || !threadDetail) return;
  dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
  try {
    await api.upVoteComment({ threadId: threadDetail.id, commentId });
  } catch (_error) {
    dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
  }
};

export const asyncDownVoteCommentDetail = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser || !threadDetail) return;
  dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
  try {
    await api.downVoteComment({ threadId: threadDetail.id, commentId });
  } catch (_error) {
    dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
  }
};

export const asyncNeutralVoteCommentDetail = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser || !threadDetail) return;
  const comment = threadDetail.comments.find((c) => c.id === commentId);
  if (!comment) return;
  const wasUpVoted = comment.upVotesBy.includes(authUser.id);
  const wasDownVoted = comment.downVotesBy.includes(authUser.id);
  if (wasUpVoted) {
    dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
  } else if (wasDownVoted) {
    dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
  }
  try {
    await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
  } catch (_error) {
    if (wasUpVoted) {
      dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
    } else if (wasDownVoted) {
      dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
    }
  }
};

export default threadDetailSlice.reducer;
