import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetThreads, setCategory } from '../states/threads/reducer';
import { asyncGetUsers } from '../states/users/reducer';
import ThreadCard from '../components/ThreadCard';
import ThreadCardSkeleton from '../components/ThreadCardSkeleton';
import CategoryFilter from '../components/CategoryFilter';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { list: threads, category } = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const isLoading = useSelector((state) => state.isLoading);

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

  const renderThreads = () => {
    if (isLoading && threads.length === 0) {
      return Array.from({ length: 5 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ThreadCardSkeleton key={i} />
      ));
    }

    if (filteredThreads.length === 0) {
      return <div className="home-empty">Tidak ada thread ditemukan.</div>;
    }

    return filteredThreads.map((thread) => {
      const owner = users.find((u) => u.id === thread.ownerId);
      return (
        <ThreadCard
          key={thread.id}
          thread={thread}
          owner={owner}
        />
      );
    });
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
        {renderThreads()}
      </div>
    </div>
  );
}

export default HomePage;
