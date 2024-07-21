import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import watchLaterSlice from "../data/watchLaterSlice";
import Movie from "./Movie";

const WatchLater = ({ viewTrailer }) => {
  const state = useSelector((state) => state);
  const { watchLater } = state;
  const { remveAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  const removeAllHandler = () => {
    dispatch(remveAllWatchLater());
  };

  return (
    <div className="watch-later__page" data-testid="watch-later-div">
      <div className="watch-later__container" data-testid="watch-later-movies">
        <div className="watch-later__header">
          <h6 className="watch-later__header-title">
            Watch Later List: ({watchLater.watchLaterMovies.length} movies)
          </h6>
          <button
            className="watch-later__header-button button-primary"
            onClick={removeAllHandler}
          >
            Remove all
          </button>
        </div>
        {watchLater.watchLaterMovies.length > 0 && (
          <div className="watch-later__movies">
            {watchLater.watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
        )}
      </div>

      {watchLater.watchLaterMovies.length === 0 && (
        <div className="watch-later__empty">
          <i class="watch-later__empty-icon fi fi-rr-diamond-exclamation"></i>
          <p className="watch-later__empty-message">
            You have no movies saved to watch later.
          </p>
          <Link to="/" className="watch-later__empty-link">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
