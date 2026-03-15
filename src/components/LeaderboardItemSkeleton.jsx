import Skeleton from 'react-loading-skeleton';
import './LeaderboardItem.css';

function LeaderboardItemSkeleton() {
  return (
    <div className="lb-row">
      <Skeleton width={28} height={20} />
      <Skeleton circle width={40} height={40} />
      <div className="lb-info">
        <Skeleton width="60%" height={15} />
      </div>
      <Skeleton width={40} height={20} />
    </div>
  );
}

export default LeaderboardItemSkeleton;
