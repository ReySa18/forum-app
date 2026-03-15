import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/reducer';
import LeaderboardItem from '../components/LeaderboardItem';
import './LeaderboardPage.css';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

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
        {leaderboards.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            item={item}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
