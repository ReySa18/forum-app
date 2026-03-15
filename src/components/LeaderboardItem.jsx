import './LeaderboardItem.css';

function getRankColor(rank) {
  if (rank === 1) return '#facc15';
  if (rank === 2) return '#94a3b8';
  if (rank === 3) return '#d97706';
  return 'var(--text-muted)';
}

function getRankLabel(rank) {
  if (rank === 1) return '\u{1F947}';
  if (rank === 2) return '\u{1F948}';
  if (rank === 3) return '\u{1F949}';
  return `#${rank}`;
}

function LeaderboardItem({ item, rank }) {
  return (
    <div className="lb-row">
      <span className="lb-rank" style={{ color: getRankColor(rank) }}>
        {getRankLabel(rank)}
      </span>
      <img
        src={item.user.avatar}
        alt={item.user.name}
        className="lb-avatar"
      />
      <div className="lb-info">
        <span className="lb-name">{item.user.name}</span>
      </div>
      <span className="lb-score">{item.score}</span>
    </div>
  );
}

export default LeaderboardItem;
