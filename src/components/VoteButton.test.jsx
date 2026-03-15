/**
 * Test scenarios for VoteButton component
 *
 * - should display the correct up-vote and down-vote counts
 * - should call onUpVote when clicked and user has not upvoted
 * - should call onNeutralVote when up-vote clicked and already upvoted
 * - should call onDownVote when clicked and user has not downvoted
 * - should call onNeutralVote when down-vote clicked and already downvoted
 * - should not call any handler when user is not authenticated
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

describe('VoteButton component', () => {
  const defaultProps = {
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: ['user-4'],
    authUserId: 'user-1',
    onUpVote: vi.fn(),
    onDownVote: vi.fn(),
    onNeutralVote: vi.fn(),
  };

  it('should display the correct up-vote and down-vote counts', () => {
    render(<VoteButton {...defaultProps} />);

    // up-vote count = 2 (user-2, user-3), down-vote count = 1 (user-4)
    expect(screen.getByTitle('Up vote').textContent).toContain('2');
    expect(screen.getByTitle('Down vote').textContent).toContain('1');
  });

  it('should call onUpVote when clicked and user has not upvoted', async () => {
    const onUpVote = vi.fn();
    render(<VoteButton {...defaultProps} onUpVote={onUpVote} />);

    const upButton = screen.getByTitle('Up vote');
    await userEvent.click(upButton);

    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onNeutralVote when up-vote clicked and already upvoted', async () => {
    const onNeutralVote = vi.fn();
    render(
      <VoteButton
        {...defaultProps}
        upVotesBy={['user-1', 'user-2']}
        onNeutralVote={onNeutralVote}
      />,
    );

    const upButton = screen.getByTitle('Up vote');
    await userEvent.click(upButton);

    expect(onNeutralVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote when clicked and user has not downvoted', async () => {
    const onDownVote = vi.fn();
    render(<VoteButton {...defaultProps} onDownVote={onDownVote} />);

    const downButton = screen.getByTitle('Down vote');
    await userEvent.click(downButton);

    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('should call onNeutralVote when down-vote clicked and already downvoted', async () => {
    const onNeutralVote = vi.fn();
    render(
      <VoteButton
        {...defaultProps}
        downVotesBy={['user-1', 'user-4']}
        onNeutralVote={onNeutralVote}
      />,
    );

    const downButton = screen.getByTitle('Down vote');
    await userEvent.click(downButton);

    expect(onNeutralVote).toHaveBeenCalledTimes(1);
  });

  it('should not call any handler when user is not authenticated', async () => {
    const onUpVote = vi.fn();
    const onDownVote = vi.fn();
    const onNeutralVote = vi.fn();
    render(
      <VoteButton
        {...defaultProps}
        authUserId={null}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
      />,
    );

    await userEvent.click(screen.getByTitle('Up vote'));
    await userEvent.click(screen.getByTitle('Down vote'));

    expect(onUpVote).not.toHaveBeenCalled();
    expect(onDownVote).not.toHaveBeenCalled();
    expect(onNeutralVote).not.toHaveBeenCalled();
  });
});
