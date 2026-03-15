import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadUser } from './states/authUser/reducer';
import Navbar from './components/Navbar';
import LoadingBar from './components/LoadingBar';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  useEffect(() => {
    dispatch(asyncPreloadUser());
  }, [dispatch]);

  return (
    <>
      <LoadingBar />
      <Toast />
      <Navbar authUser={authUser} />
      <main style={{ flex: 1, paddingTop: '1rem', paddingBottom: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/new" element={<CreateThreadPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
