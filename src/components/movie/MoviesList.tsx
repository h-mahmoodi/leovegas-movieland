import Movie from './Movie';

import { type IMovieSummery } from '../../types/Movie';

interface MoviesListProps {
  movies: IMovieSummery[];
}

const MoviesList = ({ movies }: MoviesListProps) => {
  return (
    <div data-testid="movies" className="movies">
      {movies.map((movie, index) => {
        return <Movie movie={movie} key={`${movie.id}-${index}`} />;
      })}
    </div>
  );
};

export default MoviesList;
