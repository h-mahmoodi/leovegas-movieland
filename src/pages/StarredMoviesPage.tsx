import { Link } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';

import { saveStarredMovies } from '../data/thunks/starredThunks';
import { clearAllStarred } from '../data/starredSlice';

import MoviesList from '../components/movie/MoviesList';
import Button from '../components/ui/Button';

const StarredMoviesPage = () => {
  const starredMovies = useAppSelector((state) => state.starred.movies);
  const dispatch = useAppDispatch();

  const removeAllHandler = () => {
    dispatch(clearAllStarred());
    dispatch(saveStarredMovies([]));
  };

  const hasStarredMovies = starredMovies.length > 0 ? true : false;

  return (
    <div className="starred-movies__page" data-testid="starred">
      <div className="starred-movies__container" data-testid="starred-movies ">
        <div className="starred-movies__header">
          <h6 className="starred-movies__header-title">
            Starred movies List: ({starredMovies.length} movies)
          </h6>
          {hasStarredMovies && (
            <Button buttonStyle="secondary" onClick={removeAllHandler}>
              <i className="fi fi-rr-trash"></i>
              <span>Remove all</span>
            </Button>
          )}
        </div>
        {hasStarredMovies && (
          <div className="starred-movies__movies">
            <MoviesList movies={starredMovies} />
          </div>
        )}
      </div>

      {!hasStarredMovies && (
        <div className="starred-movies__empty">
          <i className="starred-movies__empty-icon fi fi-rr-diamond-exclamation"></i>
          <p className="starred-movies__empty-message">
            There are no starred movies
          </p>
          <Link to="/" className="starred-movies__empty-link">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default StarredMoviesPage;
