import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../states/threads/reducer';
import postedAt from '../utils/postedAt';
import VoteButton from './VoteButton';
import './ThreadCard.css';

function ThreadCard({ thread, owner }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const handleUpVote = () => {
    dispatch(asyncUpVoteThread(thread.id));
  };

  const handleDownVote = () => {
    dispatch(asyncDownVoteThread(thread.id));
  };

  const handleNeutralVote = () => {
    dispatch(asyncNeutralVoteThread(thread.id));
  };

  const bodyText = thread.body.replace(/<[^>]+>/g, '');

  return (
    <div className="thread-card">
      <div className="thread-card-header">
        {owner && (
          <img
            src={owner.avatar}
            alt={owner.name}
            className="thread-card-avatar"
          />
        )}
        <div className="thread-card-header-info">
          <span className="thread-card-owner">{owner ? owner.name : 'Anonim'}</span>
          <span className="thread-card-time">{postedAt(thread.createdAt)}</span>
        </div>
      </div>
      <Link to={`/threads/${thread.id}`} className="thread-card-title">
        {thread.title}
      </Link>
      <div
        className="thread-card-body"
        dangerouslySetInnerHTML={{ __html: bodyText }}
      />
      <div className="thread-card-footer">
        <div className="thread-card-footer-left">
          <VoteButton
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            authUserId={authUser?.id}
            onUpVote={handleUpVote}
            onDownVote={handleDownVote}
            onNeutralVote={handleNeutralVote}
          />
          <span className="thread-card-comment-count">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {thread.totalComments}
          </span>
        </div>
        {thread.category && (
          <span className="thread-card-badge">
            #
            {thread.category}
          </span>
        )}
      </div>
    </div>
  );
}

export default ThreadCard;
