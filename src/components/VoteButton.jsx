import './VoteButton.css';

function VoteButton({
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote,
}) {
  const isUpVoted = authUserId && upVotesBy.includes(authUserId);
  const isDownVoted = authUserId && downVotesBy.includes(authUserId);

  const handleUpVote = () => {
    if (!authUserId) return;
    if (isUpVoted) {
      onNeutralVote();
    } else {
      onUpVote();
    }
  };

  const handleDownVote = () => {
    if (!authUserId) return;
    if (isDownVoted) {
      onNeutralVote();
    } else {
      onDownVote();
    }
  };

  return (
    <div className="vote-container">
      <button
        type="button"
        className="vote-btn"
        style={{
          color: isUpVoted ? '#22c55e' : 'var(--text-muted)',
          background: isUpVoted ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
        }}
        onClick={handleUpVote}
        title="Up vote"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className="vote-count">{upVotesBy.length}</span>
      </button>
      <button
        type="button"
        className="vote-btn"
        style={{
          color: isDownVoted ? '#ef4444' : 'var(--text-muted)',
          background: isDownVoted ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
        }}
        onClick={handleDownVote}
        title="Down vote"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span className="vote-count">{downVotesBy.length}</span>
      </button>
    </div>
  );
}

export default VoteButton;
