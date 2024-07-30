import { Route, Routes } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import WatchLaterPage from '../pages/WatchLaterPage';
import StarredMoviesPage from '../pages/StarredMoviesPage';
import SearchPage from '../pages/SearchPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="watch-later" element={<WatchLaterPage />} />
        <Route path="starred" element={<StarredMoviesPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
