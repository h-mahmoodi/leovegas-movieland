import { Link } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';

import watchLaterSlice from '../data/watchLaterSlice';

import MoviesList from '../components/movie/MoviesList';
import Button from '../components/ui/Button';

const WatchLaterPage = () => {
  const { movies } = useAppSelector((state) => state.watchLater);
  const { remveAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useAppDispatch();

  const removeAllHandler = () => {
    dispatch(remveAllWatchLater());
  };

  return (
    <div className="watch-later__page" data-testid="watch-later-div">
      <div className="watch-later__container" data-testid="watch-later-movies">
        <div className="watch-later__header">
          <h6 className="watch-later__header-title">Watch Later List: ({movies.length} movies)</h6>
          {movies.length !== 0 && (
            <Button buttonStyle="secondary" onClick={removeAllHandler}>
              <i className="fi fi-rr-trash"></i>
              <span>Remove all</span>
            </Button>
          )}
        </div>
        {movies.length > 0 && (
          <div className="watch-later__movies">
            <MoviesList movies={movies} />
          </div>
        )}
      </div>

      {movies.length === 0 && (
        <div className="watch-later__empty">
          <i className="watch-later__empty-icon fi fi-rr-diamond-exclamation"></i>
          <p className="watch-later__empty-message">You have no movies saved to watch later.</p>
          <Link to="/" className="watch-later__empty-link">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchLaterPage;
