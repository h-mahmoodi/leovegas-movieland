import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAppSelector from '../hooks/useAppSelector';

import starredSlice from '../data/starredSlice';

import MoviesList from '../components/movie/MoviesList';
import Button from '../components/ui/Button';

const StarredMoviesPage = () => {
  const { movies } = useAppSelector((state) => state.starred);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  const removeAllHandler = () => {
    dispatch(clearAllStarred());
  };

  return (
    <div className="starred-movies__page" data-testid="starred">
      <div className="starred-movies__container" data-testid="starred-movies ">
        <div className="starred-movies__header">
          <h6 className="starred-movies__header-title">
            Starred movies List: ({movies.length} movies)
          </h6>
          {movies.length !== 0 && (
            <Button buttonStyle="secondary" onClick={removeAllHandler}>
              <i className="fi fi-rr-trash"></i>
              <span>Remove all</span>
            </Button>
          )}
        </div>
        {movies.length > 0 && (
          <div className="starred-movies__movies">
            <MoviesList movies={movies} />
          </div>
        )}
      </div>

      {movies.length === 0 && (
        <div className="starred-movies__empty">
          <i className="starred-movies__empty-icon fi fi-rr-diamond-exclamation"></i>
          <p className="starred-movies__empty-message">You have no movies as starred.</p>
          <Link to="/" className="starred-movies__empty-link">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default StarredMoviesPage;
