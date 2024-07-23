import { useCallback, useEffect, useRef } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

import { ENDPOINT_DISCOVER } from '../constants';

import moviesSlice, { fetchMovies } from '../data/moviesSlice';

import MoviesList from '../components/movie/MoviesList';
import Loader from '../components/ui/Loader';

const HomePage = () => {
  const { movies, fetchStatus, currentPage, hasMoreToFetch } = useAppSelector(
    (state) => state.movies
  );

  const dispatch = useAppDispatch();

  const getMovies = useCallback(
    (page: number) => {
      const apiUrl = ENDPOINT_DISCOVER;
      dispatch(fetchMovies({ apiUrl, page }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(moviesSlice.actions.resetMovies());
    getMovies(1);
  }, [dispatch, getMovies]);

  const loadMoreMovies = useCallback(() => {
    if (fetchStatus !== 'loading') {
      getMovies(currentPage + 1);
    }
  }, [fetchStatus, currentPage, getMovies]);

  useInfiniteScroll({ fetcher: loadMoreMovies, hasMoreToFetch });

  if (!fetchStatus || fetchStatus === 'error') {
    return <h1 className="text-center">Something is wrong.😓 </h1>;
  }

  return (
    <>
      <MoviesList movies={movies} />
      {fetchStatus === 'loading' && <Loader />}
    </>
  );
};

export default HomePage;
