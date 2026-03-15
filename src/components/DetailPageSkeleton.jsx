import Skeleton from 'react-loading-skeleton';
import '../pages/DetailPage.css';

function DetailPageSkeleton() {
  return (
    <div className="detail-container">
      <div className="detail-thread-card">
        <div className="detail-header">
          <Skeleton circle width={44} height={44} />
          <div className="detail-header-info">
            <Skeleton width={120} height={15} />
            <Skeleton width={80} height={12} />
          </div>
        </div>
        <Skeleton width="60%" height={24} style={{ marginBottom: '0.75rem' }} />
        <Skeleton width={80} height={22} borderRadius={999} style={{ marginBottom: '1rem' }} />
        <Skeleton count={4} height={15} style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="40%" height={15} style={{ marginBottom: '1.25rem' }} />
        <Skeleton width={140} height={28} />
      </div>

      <div className="detail-comments-section">
        <Skeleton width={160} height={18} style={{ marginBottom: '1rem' }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <Skeleton circle width={36} height={36} />
            <div style={{ flex: 1 }}>
              <Skeleton width={100} height={14} style={{ marginBottom: '0.25rem' }} />
              <Skeleton count={2} height={13} style={{ marginBottom: '0.25rem' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPageSkeleton;
