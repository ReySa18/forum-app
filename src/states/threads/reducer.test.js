/**
 * Test scenarios for threadsReducer
 *
 * - Reducer function
 *   - should return the initial state when given an unknown action
 *   - setThreads action
 *     - should set threads list with the given payload
 *   - addThread action
 *     - should add a new thread to the beginning of the list
 *   - setCategory action
 *     - should set the active category filter
 *   - toggleUpVoteThread action
 *     - should add userId to upVotesBy when not yet voted
 *     - should remove userId from upVotesBy when already upvoted (toggle off)
 *     - should move userId from downVotesBy to upVotesBy when switching vote
 *   - toggleDownVoteThread action
 *     - should add userId to downVotesBy when not yet voted
 *     - should remove userId from downVotesBy when already downvoted (toggle off)
 *     - should move userId from upVotesBy to downVotesBy when switching vote
 *
 * - Thunk function
 *   - asyncGetThreads
 *     - should dispatch setThreads with threads data on success
 *     - should dispatch setLoading(false) when API fails
 *   - asyncCreateThread
 *     - should dispatch addThread and success notification on success
 *     - should dispatch error notification and throw when API fails
 */

import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, {
  setThreads,
  addThread,
  setCategory,
  toggleUpVoteThread,
  toggleDownVoteThread,
  asyncGetThreads,
  asyncCreateThread,
} from './reducer';
import isLoadingReducer from '../isLoading/reducer';
import notificationReducer from '../notification/reducer';

vi.mock('../../utils/api');

describe('threadsReducer', () => {
  const initialState = { list: [], category: '' };

  it('should return the initial state when given an unknown action', () => {
    const state = threadsReducer(undefined, { type: 'UNKNOWN' });
    // intentionally broken for CI demo
    expect(state).toEqual({ list: ['broken'], category: 'fail' });
  });

  describe('setThreads action', () => {
    it('should set threads list with the given payload', () => {
      const threads = [
        {
          id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
        },
        {
          id: 'thread-2', title: 'Thread 2', upVotesBy: [], downVotesBy: [],
        },
      ];
      const state = threadsReducer(initialState, setThreads(threads));
      expect(state.list).toEqual(threads);
    });
  });

  describe('addThread action', () => {
    it('should add a new thread to the beginning of the list', () => {
      const existingThread = {
        id: 'thread-1', title: 'Old Thread', upVotesBy: [], downVotesBy: [],
      };
      const newThread = {
        id: 'thread-2', title: 'New Thread', upVotesBy: [], downVotesBy: [],
      };
      const prevState = { list: [existingThread], category: '' };
      const state = threadsReducer(prevState, addThread(newThread));
      expect(state.list).toHaveLength(2);
      expect(state.list[0]).toEqual(newThread);
      expect(state.list[1]).toEqual(existingThread);
    });
  });

  describe('setCategory action', () => {
    it('should set the active category filter', () => {
      const state = threadsReducer(initialState, setCategory('react'));
      expect(state.category).toBe('react');
    });
  });

  describe('toggleUpVoteThread action', () => {
    it('should add userId to upVotesBy when not yet voted', () => {
      const thread = { id: 'thread-1', upVotesBy: [], downVotesBy: [] };
      const prevState = { list: [thread], category: '' };
      const state = threadsReducer(
        prevState,
        toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
      );
      expect(state.list[0].upVotesBy).toContain('user-1');
    });

    it('should remove userId from upVotesBy when already upvoted (toggle off)', () => {
      const thread = { id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] };
      const prevState = { list: [thread], category: '' };
      const state = threadsReducer(
        prevState,
        toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
      );
      expect(state.list[0].upVotesBy).not.toContain('user-1');
    });

    it('should move userId from downVotesBy to upVotesBy when switching vote', () => {
      const thread = { id: 'thread-1', upVotesBy: [], downVotesBy: ['user-1'] };
      const prevState = { list: [thread], category: '' };
      const state = threadsReducer(
        prevState,
        toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
      );
      expect(state.list[0].upVotesBy).toContain('user-1');
      expect(state.list[0].downVotesBy).not.toContain('user-1');
    });
  });

  describe('toggleDownVoteThread action', () => {
    it('should add userId to downVotesBy when not yet voted', () => {
      const thread = { id: 'thread-1', upVotesBy: [], downVotesBy: [] };
      const prevState = { list: [thread], category: '' };
      const state = threadsReducer(
        prevState,
        toggleDownVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
      );
      expect(state.list[0].downVotesBy).toContain('user-1');
    });

    it('should remove userId from downVotesBy when already downvoted (toggle off)', () => {
      const thread = { id: 'thread-1', upVotesBy: [], downVotesBy: ['user-1'] };
      const prevState = { list: [thread], category: '' };
      const state = threadsReducer(
        prevState,
        toggleDownVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
      );
      expect(state.list[0].downVotesBy).not.toContain('user-1');
    });

    it('should move userId from upVotesBy to downVotesBy when switching vote', () => {
      const thread = { id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] };
      const prevState = { list: [thread], category: '' };
      const state = threadsReducer(
        prevState,
        toggleDownVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
      );
      expect(state.list[0].downVotesBy).toContain('user-1');
      expect(state.list[0].upVotesBy).not.toContain('user-1');
    });
  });
});

describe('threads thunks', () => {
  let store;
  let apiModule;

  beforeEach(async () => {
    apiModule = await import('../../utils/api');
    vi.restoreAllMocks();
    store = configureStore({
      reducer: {
        threads: threadsReducer,
        isLoading: isLoadingReducer,
        notification: notificationReducer,
      },
    });
  });

  describe('asyncGetThreads', () => {
    it('should dispatch setThreads with threads data on success', async () => {
      const fakeThreads = [
        {
          id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
        },
      ];
      apiModule.getAllThreads = vi.fn(() => Promise.resolve(fakeThreads));

      await store.dispatch(asyncGetThreads());

      const state = store.getState();
      expect(state.threads.list).toEqual(fakeThreads);
      expect(state.isLoading).toBe(false);
    });

    it('should still dispatch setLoading(false) when API fails', async () => {
      apiModule.getAllThreads = vi.fn(
        () => Promise.reject(new Error('Network error')),
      );

      // asyncGetThreads uses try/finally without catch, so the error propagates
      try {
        await store.dispatch(asyncGetThreads());
      } catch (_error) {
        // expected
      }

      const state = store.getState();
      expect(state.threads.list).toEqual([]);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('asyncCreateThread', () => {
    it('should dispatch addThread and success notification on success', async () => {
      const fakeThread = {
        id: 'thread-new',
        title: 'New Thread',
        body: 'Body content',
        category: 'test',
        upVotesBy: [],
        downVotesBy: [],
      };
      apiModule.createThread = vi.fn(() => Promise.resolve(fakeThread));

      const result = await store.dispatch(
        asyncCreateThread({
          title: 'New Thread', body: 'Body content', category: 'test',
        }),
      );

      const state = store.getState();
      expect(state.threads.list[0]).toEqual(fakeThread);
      expect(state.notification.type).toBe('success');
      expect(result).toEqual(fakeThread);
    });

    it('should dispatch error notification and throw when API fails', async () => {
      apiModule.createThread = vi.fn(
        () => Promise.reject(new Error('Gagal membuat thread.')),
      );

      await expect(
        store.dispatch(
          asyncCreateThread({ title: 'Fail', body: 'Body', category: '' }),
        ),
      ).rejects.toThrow('Gagal membuat thread.');

      const state = store.getState();
      expect(state.notification.type).toBe('error');
      expect(state.isLoading).toBe(false);
    });
  });
});
