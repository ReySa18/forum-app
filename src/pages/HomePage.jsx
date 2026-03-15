import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetThreads, setCategory } from '../states/threads/reducer';
import { asyncGetUsers } from '../states/users/reducer';
import ThreadCard from '../components/ThreadCard';
import CategoryFilter from '../components/CategoryFilter';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { list: threads, category } = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncGetThreads());
    dispatch(asyncGetUsers());
  }, [dispatch]);

  const categories = useMemo(() => {
    const cats = threads.map((t) => t.category).filter(Boolean);
    return [...new Set(cats)];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!category) return threads;
    return threads.filter((t) => t.category === category);
  }, [threads, category]);

  const handleCategorySelect = (cat) => {
    dispatch(setCategory(cat));
  };

  return (
    <div className="home-container">
      <aside className="home-sidebar">
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={handleCategorySelect}
        />
        {authUser && (
          <Link to="/new" className="home-new-btn">
            + Buat Thread Baru
          </Link>
        )}
      </aside>
      <div className="home-main">
        <div className="home-header">
          <h1 className="home-title">Diskusi Terbaru</h1>
        </div>
        {filteredThreads.length === 0 ? (
          <div className="home-empty">Tidak ada thread ditemukan.</div>
        ) : (
          filteredThreads.map((thread) => {
            const owner = users.find((u) => u.id === thread.ownerId);
            return (
              <ThreadCard
                key={thread.id}
                thread={thread}
                owner={owner}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomePage;
