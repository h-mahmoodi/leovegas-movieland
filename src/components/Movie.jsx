import { useDispatch, useSelector } from "react-redux";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import placeholder from "../assets/not-found-500X750.jpeg";

const Movie = ({ movie, viewTrailer, closeCard }) => {
  const state = useSelector((state) => state);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const dispatch = useDispatch();

  const myClickHandler = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove("opened");
  };

  return (
    <div className="movie-item">
      <div
        className="card"
        onClick={(e) => e.currentTarget.classList.add("opened")}
      >
        <div className="header">{movie.title}</div>
        <div
          className="card-body"
          style={{
            backgroundImage: `url(
              ${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : placeholder
              }
                
            )`,
          }}
        >
          <div className="overlay" />
          <div className="info_panel">
            <div>
              <button
                type="button"
                className="btn-play"
                onClick={() => viewTrailer(movie)}
              >
                <i class="fi fi-rr-play-circle"></i>
              </button>
              <h3>Watch Trailer</h3>
            </div>

            <div className="overview">
              <div className="overview-header">
                <div className="overview-title">Summary</div>
                <div className="year">
                  {movie.release_date?.substring(0, 4)}
                </div>
              </div>
              <div className="overview-body">{movie.overview}</div>
            </div>
          </div>
        </div>
        <div className="footer">
          {!watchLater.watchLaterMovies
            .map((movie) => movie.id)
            .includes(movie.id) ? (
            <button
              type="button"
              data-testid="watch-later"
              className="btn-watch-later"
              onClick={() =>
                dispatch(
                  addToWatchLater({
                    id: movie.id,
                    overview: movie.overview,
                    release_date: movie.release_date?.substring(0, 4),
                    poster_path: movie.poster_path,
                    title: movie.title,
                  })
                )
              }
            >
              <i class="fi fi-sr-video-duration"></i>
            </button>
          ) : (
            <button
              type="button"
              data-testid="remove-watch-later"
              className="btn-watch-later active"
              onClick={() => dispatch(removeFromWatchLater(movie))}
            >
              <i class="fi fi-sr-video-duration"></i>
            </button>
          )}
          {!starred.starredMovies
            .map((movie) => movie.id)
            .includes(movie.id) ? (
            <span
              className="btn-star"
              data-testid="starred-link"
              onClick={() =>
                dispatch(
                  starMovie({
                    id: movie.id,
                    overview: movie.overview,
                    release_date: movie.release_date?.substring(0, 4),
                    poster_path: movie.poster_path,
                    title: movie.title,
                  })
                )
              }
            >
              <i class="fi fi-sr-wishlist-star"></i>
            </span>
          ) : (
            <span
              className="btn-star active"
              data-testid="unstar-link"
              onClick={() => dispatch(unstarMovie(movie))}
            >
              <i className="fi fi-sr-wishlist-star" data-testid="star-fill" />
            </span>
          )}
        </div>

        <button
          type="button"
          className="close"
          onClick={(e) => myClickHandler(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
