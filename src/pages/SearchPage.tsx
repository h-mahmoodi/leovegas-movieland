import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

import { ENDPOINT_SEARCH } from '../constants';

import { resetMovies } from '../data/moviesSlice/moviesSlice';
import { fetchMovies } from '../data/moviesSlice/thunks';

import Loader from '../components/ui/Loader';
import MoviesList from '../components/movie/MoviesList';

const SearchPage = () => {
  const { movies, fetchStatus, currentPage, hasMoreToFetch, totalResults } =
    useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('title') || '';

  const getMovies = useCallback(
    (page: number) => {
      const apiUrl = `${ENDPOINT_SEARCH}&query=${searchQuery}`;
      dispatch(fetchMovies({ apiUrl, page }));
    },
    [searchQuery, dispatch]
  );

  useEffect(() => {
    dispatch(resetMovies());
    getMovies(1);
  }, [searchQuery, dispatch, getMovies]);

  const loadMoreMovies = useCallback(() => {
    if (fetchStatus !== 'loading') {
      getMovies(currentPage + 1);
    }
  }, [fetchStatus, currentPage, getMovies]);

  const loaderRef = useInfiniteScroll({
    fetcher: loadMoreMovies,
    hasMoreToFetch,
  });

  if (fetchStatus === 'error') {
    return <h1 className="text-center">Something is wrong.😓 </h1>;
  }

  return (
    <>
      <div className="search-page">
        <div className="search-page_header">
          <h2 className="search-page_header-title">Search For Movies</h2>
          <div className="search-page_header-report">
            You are searching for
            <span className="search-page_header-report-info">
              {searchQuery}
            </span>
            with
            <span className="search-page_header-report-info">
              {fetchStatus === 'loading' ? '--' : totalResults}
            </span>
            resulst
          </div>
        </div>
      </div>
      <MoviesList movies={movies} />
      {fetchStatus === 'loading' && <Loader />}
      <div ref={loaderRef} />
      {movies.length === 0 && fetchStatus !== 'loading' && 'No movies found 😞'}
    </>
  );
};

export default SearchPage;
