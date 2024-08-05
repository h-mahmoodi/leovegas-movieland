import { fetchMovies } from '../data/moviesSlice/thunks';
import { moviesMock } from '../mocks/movies.mocks';

describe('MovieSlice test', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending };

    expect(action).toEqual({ type: fetchMovies.pending });
  });

  it('should return payload when action is fulfilled', () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: {
        movies: moviesMock,
        fetchStatus: 'success',
        currentPage: 1,
        hasMoreToFetch: true,
        totalResults: moviesMock.length,
      },
    };

    expect(action.payload.movies).toBeTruthy();
  });

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected };

    expect(action).toEqual({ type: fetchMovies.rejected });
  });
});
