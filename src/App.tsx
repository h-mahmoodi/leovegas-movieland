import { useEffect } from 'react';
import AppRouter from './router/AppRouter';

import useAppDispatch from './hooks/useAppDispatch';

import { loadStarredMovies } from './data/thunks/starredThunks';
import { loadWatchLaterMovies } from './data/thunks/watchLaterThunks';

import './styles/main.scss';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadStarredMovies());
    dispatch(loadWatchLaterMovies());
  }, [dispatch]);

  return <AppRouter />;
};

export default App;
