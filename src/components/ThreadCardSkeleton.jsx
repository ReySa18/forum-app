import Skeleton from 'react-loading-skeleton';
import './ThreadCard.css';

function ThreadCardSkeleton() {
  return (
    <div className="thread-card">
      <div className="thread-card-header">
        <Skeleton circle width={36} height={36} />
        <div className="thread-card-header-info">
          <Skeleton width={100} height={14} />
          <Skeleton width={60} height={12} />
        </div>
      </div>
      <Skeleton width="75%" height={16} style={{ marginBottom: '0.5rem' }} />
      <Skeleton count={2} height={14} style={{ marginBottom: '0.25rem' }} />
      <div className="thread-card-footer">
        <Skeleton width={120} height={14} />
        <Skeleton width={60} height={22} borderRadius={999} />
      </div>
    </div>
  );
}

export default ThreadCardSkeleton;
