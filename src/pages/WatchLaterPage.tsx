import { Link, useActionData } from "react-router-dom";
import watchLaterSlice from "../data/watchLaterSlice";
import useAppSelector from "../hooks/useAppSelector";
import MoviesList from "../components/movie/MoviesList";
import useAppDispatch from "../hooks/useAppDispatch";

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
          <h6 className="watch-later__header-title">
            Watch Later List: ({movies.length} movies)
          </h6>
          <button
            className="watch-later__header-button button-primary"
            onClick={removeAllHandler}
          >
            Remove all
          </button>
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

export default WatchLaterPage;
