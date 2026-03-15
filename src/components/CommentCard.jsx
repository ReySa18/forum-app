import postedAt from '../utils/postedAt';
import VoteButton from './VoteButton';
import './CommentCard.css';

function CommentCard({
  comment,
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote,
}) {
  return (
    <div className="comment-card">
      <img
        src={comment.owner.avatar}
        alt={comment.owner.name}
        className="comment-avatar"
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-name">{comment.owner.name}</span>
          <span className="comment-time">{postedAt(comment.createdAt)}</span>
        </div>
        <div
          className="comment-body"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
        <VoteButton
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
        />
      </div>
    </div>
  );
}

export default CommentCard;
