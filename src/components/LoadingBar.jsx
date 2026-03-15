import { useSelector } from 'react-redux';

function LoadingBar() {
  const isLoading = useSelector((state) => state.isLoading);

  return <div className={`loading-bar ${isLoading ? 'active' : ''}`} />;
}

export default LoadingBar;
