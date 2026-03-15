import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/reducer';
import LeaderboardItem from '../components/LeaderboardItem';
import LeaderboardItemSkeleton from '../components/LeaderboardItemSkeleton';
import './LeaderboardPage.css';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-header">
        <span>Pengguna</span>
        <span>Skor</span>
      </div>
      <div className="leaderboard-list">
        {isLoading && leaderboards.length === 0 ? (
          Array.from({ length: 10 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <LeaderboardItemSkeleton key={i} />
          ))
        ) : (
          leaderboards.map((item, index) => (
            <LeaderboardItem
              key={item.user.id}
              item={item}
              rank={index + 1}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
