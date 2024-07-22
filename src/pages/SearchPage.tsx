import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { ENDPOINT_SEARCH } from "../constants";
import moviesSlice, { fetchMovies } from "../data/moviesSlice";
import { useCallback, useEffect, useRef } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Loader from "../components/ui/Loader";
import MoviesList from "../components/movie/MoviesList";

const SearchPage = () => {
  const { movies, fetchStatus, currentPage, hasMoreToFetch, totalResults } =
    useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("title");
  const initialFetchRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const getMovies = useCallback(
    (page: number) => {
      const apiUrl = `${ENDPOINT_SEARCH}&query=${searchQuery}`;
      dispatch(fetchMovies({ apiUrl, page }));
    },
    [searchQuery, dispatch]
  );

  useEffect(() => {
    dispatch(moviesSlice.actions.resetMovies());
    getMovies(1);
    initialFetchRef.current = false;
  }, [searchQuery, dispatch, getMovies]);

  const loadMoreMovies = useCallback(() => {
    if (fetchStatus !== "loading") {
      getMovies(currentPage + 1);
    }
  }, [fetchStatus, currentPage, getMovies]);

  useInfiniteScroll({ fetcher: loadMoreMovies, hasMoreToFetch });

  if (!fetchStatus || fetchStatus === "error") {
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
              {fetchStatus === "loading" ? "--" : totalResults}
            </span>
            resulst
          </div>
        </div>
      </div>
      <MoviesList movies={movies} />
      {fetchStatus === "loading" && <Loader />}
      {movies.length === 0 && fetchStatus !== "loading" && "No movies found 😞"}
    </>
  );
};

export default SearchPage;
