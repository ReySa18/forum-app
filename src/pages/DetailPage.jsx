import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncGetThreadDetail,
  asyncCreateComment,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
  asyncUpVoteCommentDetail,
  asyncDownVoteCommentDetail,
  asyncNeutralVoteCommentDetail,
} from '../states/threadDetail/reducer';
import VoteButton from '../components/VoteButton';
import CommentCard from '../components/CommentCard';
import CommentInput from '../components/CommentInput';
import DetailPageSkeleton from '../components/DetailPageSkeleton';
import postedAt from '../utils/postedAt';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));
  }, [dispatch, id]);

  const handleComment = (content) => {
    dispatch(asyncCreateComment({ threadId: id, content }));
  };

  const handleUpVote = () => {
    dispatch(asyncUpVoteDetailThread());
  };

  const handleDownVote = () => {
    dispatch(asyncDownVoteDetailThread());
  };

  const handleNeutralVote = () => {
    dispatch(asyncNeutralVoteDetailThread());
  };

  if (!threadDetail) {
    return <DetailPageSkeleton />;
  }

  return (
    <div className="detail-container">
      <div className="detail-thread-card">
        <div className="detail-header">
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            className="detail-avatar"
          />
          <div className="detail-header-info">
            <span className="detail-owner-name">{threadDetail.owner.name}</span>
            <span className="detail-time">{postedAt(threadDetail.createdAt)}</span>
          </div>
        </div>
        <h1 className="detail-title">{threadDetail.title}</h1>
        {threadDetail.category && (
          <span className="detail-badge">
            #
            {threadDetail.category}
          </span>
        )}
        <div
          className="detail-body"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
        <VoteButton
          upVotesBy={threadDetail.upVotesBy}
          downVotesBy={threadDetail.downVotesBy}
          authUserId={authUser?.id}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          onNeutralVote={handleNeutralVote}
        />
      </div>

      <div className="detail-comments-section">
        <h2 className="detail-comments-title">
          Komentar (
          {threadDetail.comments.length}
          )
        </h2>
        {authUser ? (
          <CommentInput onSubmit={handleComment} />
        ) : (
          <p className="detail-login-hint">
            Silakan login untuk menambahkan komentar.
          </p>
        )}
        {threadDetail.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            authUserId={authUser?.id}
            onUpVote={() => dispatch(asyncUpVoteCommentDetail(comment.id))}
            onDownVote={() => dispatch(asyncDownVoteCommentDetail(comment.id))}
            onNeutralVote={() => dispatch(asyncNeutralVoteCommentDetail(comment.id))}
          />
        ))}
      </div>
    </div>
  );
}

export default DetailPage;
