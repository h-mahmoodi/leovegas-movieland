import Movie from "./Movie";

const Movies = ({ movies, viewTrailer, closeCard }) => {
  console.log(movies);
  return (
    <div data-testid="movies" className="movies">
      {movies.movies.results?.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer}
            closeCard={closeCard}
          />
        );
      })}
    </div>
  );
};

export default Movies;
