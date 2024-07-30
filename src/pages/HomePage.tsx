import { useCallback, useEffect } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

import { ENDPOINT_DISCOVER } from '../constants';

import { resetMovies } from '../data/moviesSlice';
import { fetchMovies } from '../data/thunks/moviesThunks';

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
    dispatch(resetMovies());
    getMovies(1);
  }, [dispatch, getMovies]);

  const loadMoreMovies = useCallback(() => {
    if (fetchStatus !== 'loading') {
      getMovies(currentPage + 1);
    }
  }, [fetchStatus, currentPage, getMovies]);

  const loaderRef = useInfiniteScroll({
    fetcher: loadMoreMovies,
    hasMoreToFetch,
  });

  if (!fetchStatus || fetchStatus === 'error') {
    return <h1 className="text-center">Something is wrong.😓 </h1>;
  }

  return (
    <>
      <MoviesList movies={movies} />
      {fetchStatus === 'loading' && <Loader />}
      <div ref={loaderRef} />
    </>
  );
};

export default HomePage;
