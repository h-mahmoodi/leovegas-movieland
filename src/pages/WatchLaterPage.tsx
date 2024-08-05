import { Link } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';

import { saveWatchLaterMovies } from '../data/watchLaterSlice/thunks';
import { removeAllWatchLater } from '../data/watchLaterSlice/watchLaterSlice';

import MoviesList from '../components/movie/MoviesList';
import Button from '../components/ui/Button';

const WatchLaterPage = () => {
  const watchLaterMovies = useAppSelector((state) => state.watchLater.movies);
  const dispatch = useAppDispatch();

  const removeAllHandler = () => {
    dispatch(removeAllWatchLater());
    dispatch(saveWatchLaterMovies([]));
  };

  const hasWatchLaterMovies = watchLaterMovies.length > 0;

  return (
    <div className="watch-later__page" data-testid="watch-later-div">
      <div className="watch-later__container" data-testid="watch-later-movies">
        <div className="watch-later__header">
          <h6 className="watch-later__header-title">
            Watch Later List: ({watchLaterMovies.length} movies)
          </h6>
          <Button
            buttonStyle="secondary"
            onClick={removeAllHandler}
            disabled={!hasWatchLaterMovies}
          >
            <i className="fi fi-rr-trash"></i>
            <span>Remove all</span>
          </Button>
        </div>
        {hasWatchLaterMovies ? (
          <div className="watch-later__movies">
            <MoviesList movies={watchLaterMovies} />
          </div>
        ) : (
          <div className="watch-later__empty">
            <i className="watch-later__empty-icon fi fi-rr-diamond-exclamation"></i>
            <p className="watch-later__empty-message">
              You have no movies saved to watch later.
            </p>
            <Link to="/" className="link link-secondary">
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLaterPage;
