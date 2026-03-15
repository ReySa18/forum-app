import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import isLoadingReducer from './isLoading/reducer';
import notificationReducer from './notification/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    isLoading: isLoadingReducer,
    notification: notificationReducer,
  },
});

export default store;
