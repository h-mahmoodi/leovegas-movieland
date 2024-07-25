import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';

import starredSlice from '../../data/starredSlice';
import watchLaterSlice from '../../data/watchLaterSlice';
import appSlice, { fetchTrailer } from '../../data/appSlice';

import { type IMovieSummery } from '../../types/Movie';

import placeholder from '../../assets/not-found-500X750.jpeg';
interface MovieProps {
  movie: IMovieSummery;
}

const Movie = ({ movie }: MovieProps) => {
  const starred = useAppSelector((state) => state.starred);
  const watchLater = useAppSelector((state) => state.watchLater);
  const dispatch = useAppDispatch();

  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const { openModal, movieDetails } = appSlice.actions;

  const addToWatchLaterHandler = () => {
    const movieItem: IMovieSummery = {
      id: movie.id,
      overview: movie.overview,
      release_date: movie.release_date?.substring(0, 4),
      poster_path: movie.poster_path,
      title: movie.title,
      vote_average: movie.vote_average
    };
    dispatch(addToWatchLater(movieItem));
  };

  const removeFromWatchLaterHandler = () => {
    dispatch(removeFromWatchLater(movie));
  };

  const addToStarMovieHandler = () => {
    dispatch(
      starMovie({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
        vote_average: movie.vote_average
      })
    );
  };

  const removeFromStarMovie = () => {
    dispatch(unstarMovie(movie));
  };

  const viewTrailerHandler = async (movie: IMovieSummery) => {
    dispatch(openModal());
    dispatch(movieDetails({ title: movie.title, overview: movie.overview }));
    dispatch(fetchTrailer(movie.id.toString()));
    // console.log(await fetchTrailer(id));
  };

  return (
    <div className="movie-item">
      <div className="movie-item__card" onClick={(e) => e.currentTarget.classList.add('opened')}>
        <div className="movie-item__card-header">{movie.title}</div>
        <div
          className="movie-item__card-body"
          style={{
            backgroundImage: `url(
              ${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : placeholder
              }
                
            )`
          }}>
          {/* <div className="overlay" /> */}
          <div className="movie-item__card-body__info">
            <div>
              <button
                type="button"
                className="movie-item__card-body__info-play-button"
                onClick={() => viewTrailerHandler(movie)}>
                <i className="fi fi-rr-play-circle"></i>
              </button>
              <h3 className="movie-item__card-body__info-title">Watch Trailer</h3>
            </div>

            <div className="movie-item__card-body__info__overview">
              <h3 className="movie-item__card-body__info__overview-name">{movie.title}</h3>
              <div className="movie-item__card-body__info__overview-header">
                <div className="movie-item__card-body__info__overview-title">Summary</div>
                <div className="movie-item__card-body__info__overview-year">
                  {movie.release_date?.substring(0, 4)}
                </div>
              </div>
              <div className="movie-item__card-body__info__overview-body">{movie.overview}</div>
            </div>
          </div>
        </div>
        <div className="movie-item__card-footer">
          <div>
            <span>IMDB: {movie.vote_average ? movie.vote_average.toFixed(1) : 0}</span>
          </div>
          <div className="movie-item__card-footer_buttons">
            {!watchLater.movies.map((movie) => movie.id).includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="movie-item__card-footer-later-button"
                onClick={addToWatchLaterHandler}>
                <i className="fi fi-rr-video-duration"></i>
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="movie-item__card-footer-later-button movie-item__card-footer-later-button--active"
                onClick={removeFromWatchLaterHandler}>
                <i className="fi fi-rr-video-duration"></i>
              </button>
            )}
            {!starred.movies.map((movie) => movie.id).includes(movie.id) ? (
              <span
                className="movie-item__card-footer-star-button"
                data-testid="starred-link"
                onClick={addToStarMovieHandler}>
                <i className="fi fi-rr-wishlist-star"></i>
              </span>
            ) : (
              <span
                className="movie-item__card-footer-star-button movie-item__card-footer-star-button--active"
                data-testid="unstar-link"
                onClick={removeFromStarMovie}>
                <i className="fi fi-rr-wishlist-star" data-testid="star-fill" />
              </span>
            )}
          </div>
        </div>

        {/* <button
          type="button"
          className="close"
          onClick={(e) => myClickHandler(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
    </div>
  );
};

export default Movie;
