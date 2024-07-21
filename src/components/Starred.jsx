import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import starredSlice from "../data/starredSlice";
import Movie from "./movie/Movie";

const Starred = ({ viewTrailer }) => {
  const state = useSelector((state) => state);
  const { starred } = state;
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
            Starred movies List: ({starred.starredMovies.length} movies)
          </h6>
          <button
            className="starred-movies__header-button button-primary"
            onClick={removeAllHandler}
          >
            Remove all
          </button>
        </div>
        {starred.starredMovies.length > 0 && (
          <div className="starred-movies__movies">
            {starred.starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
        )}
      </div>

      {starred.starredMovies.length === 0 && (
        <div className="starred-movies__empty">
          <i class="starred-movies__empty-icon fi fi-rr-diamond-exclamation"></i>
          <p className="starred-movies__empty-message">
            You have no movies as starred.
          </p>
          <Link to="/" className="starred-movies__empty-link">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Starred;
