import { IMovie, IMovieSummery } from "../../types/Movie";
import Movie from "./Movie";

interface MoviesListProps {
  movies: IMovie[] | IMovieSummery[];
}

const MoviesList = ({ movies }: MoviesListProps) => {
  return (
    <div data-testid="movies" className="movies">
      {movies.map((movie, index) => {
        return (
          <Movie
            movie={movie}
            key={`${movie.id}-${index}`}
            // viewTrailer={viewTrailer}
            // closeCard={closeCard}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;
