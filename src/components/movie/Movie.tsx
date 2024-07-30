import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';

import { starMovie, unstarMovie } from '../../data/starredSlice';
import {
  addToWatchLater,
  removeFromWatchLater,
} from '../../data/watchLaterSlice';

import { saveWatchLaterMovies } from '../../data/thunks/watchLaterThunks';
import { saveStarredMovies } from '../../data/thunks/starredThunks';

import { type IMovieSummery } from '../../types/Movie';

import placeholder from '../../assets/not-found-500X750.jpeg';
import { useState } from 'react';
import Modal from '../ui/Modal';

interface MovieProps {
  movie: IMovieSummery;
}

const Movie = ({ movie }: MovieProps) => {
  const dispatch = useAppDispatch();
  const starredMovies = useAppSelector((state) => state.starred.movies);
  const watchLaterMovies = useAppSelector((state) => state.watchLater.movies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToWatchLaterHandler = () => {
    dispatch(addToWatchLater(movie));
    dispatch(saveWatchLaterMovies([...watchLaterMovies, movie]));
  };

  const removeFromWatchLaterHandler = () => {
    dispatch(removeFromWatchLater(movie));
    const updatedMovies = watchLaterMovies.filter((m) => m.id !== movie.id);
    dispatch(saveWatchLaterMovies(updatedMovies));
  };

  const addToStarMovieHandler = () => {
    dispatch(starMovie(movie));
    dispatch(saveStarredMovies([...starredMovies, movie]));
  };

  const removeFromStarMovie = () => {
    dispatch(unstarMovie(movie));
    const updatedMovies = starredMovies.filter((m) => m.id !== movie.id);
    dispatch(saveStarredMovies(updatedMovies));
  };

  const viewTrailerHandler = () => {
    setIsModalOpen(true);
  };

  const moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : placeholder.toString();

  const isMovieStarred = starredMovies.find((item) => item.id === movie.id);
  const isMovieInWatchLater = watchLaterMovies.find(
    (item) => item.id === movie.id
  );
  return (
    <>
      <div className="movie-item">
        <div
          className="movie-item__card"
          onClick={(e) => e.currentTarget.classList.add('opened')}
        >
          <div className="movie-item__card-header">{movie.title}</div>
          <div
            className="movie-item__card-body"
            style={{
              backgroundImage: `url(${moviePoster})`,
            }}
          >
            <div className="movie-item__card-body__info">
              <div>
                <button
                  type="button"
                  className="movie-item__card-body__info-play-button"
                  onClick={viewTrailerHandler}
                  data-testid="watch-trailer"
                >
                  <i className="fi fi-rr-play-circle"></i>
                </button>
                <h3 className="movie-item__card-body__info-title">
                  Watch Trailer
                </h3>
              </div>

              <div className="movie-item__card-body__info__overview">
                <h3 className="movie-item__card-body__info__overview-name">
                  {movie.title}
                </h3>
                <div className="movie-item__card-body__info__overview-header">
                  <div className="movie-item__card-body__info__overview-title">
                    Summary
                  </div>
                  <div className="movie-item__card-body__info__overview-year">
                    {movie.release_date?.substring(0, 4)}
                  </div>
                </div>
                <div className="movie-item__card-body__info__overview-body">
                  {movie.overview}
                </div>
              </div>
            </div>
          </div>
          <div className="movie-item__card-footer">
            <div>
              <span>
                IMDB: {movie.vote_average ? movie.vote_average.toFixed(1) : 0}
              </span>
            </div>
            <div className="movie-item__card-footer_buttons">
              {isMovieInWatchLater ? (
                <button
                  type="button"
                  data-testid="remove-watch-later"
                  className="movie-item__card-footer-later-button movie-item__card-footer-later-button--active"
                  onClick={removeFromWatchLaterHandler}
                >
                  <i className="fi fi-rr-video-duration"></i>
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="watch-later"
                  className="movie-item__card-footer-later-button"
                  onClick={addToWatchLaterHandler}
                >
                  <i className="fi fi-rr-video-duration"></i>
                </button>
              )}

              {isMovieStarred ? (
                <button
                  className="movie-item__card-footer-star-button movie-item__card-footer-star-button--active"
                  data-testid="unstar-link"
                  onClick={removeFromStarMovie}
                >
                  <i
                    className="fi fi-rr-wishlist-star"
                    data-testid="star-fill"
                  />
                </button>
              ) : (
                <button
                  className="movie-item__card-footer-star-button"
                  data-testid="starred-link"
                  onClick={addToStarMovieHandler}
                >
                  <i className="fi fi-rr-wishlist-star"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} movie={movie} />
      )}
    </>
  );
};

export default Movie;
