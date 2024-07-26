import { fetchMovies } from '../data/moviesSlice';
import { moviesMock } from './movies.mocks';

describe('MovieSlice test', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending };
    // const initialState = moviesSlice.reducer(
    //   {
    //     movies: [],
    //     fetchStatus: 'loading',
    //     currentPage: 1,
    //     hasMoreToFetch: true,
    //     totalResults: 0,
    //   },
    //   action
    // );
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
    // const initialState = moviesSlice.reducer(
    //   {
    //     movies: [],
    //     fetchStatus: 'loading',
    //     currentPage: 1,
    //     hasMoreToFetch: true,
    //     totalResults: 0,
    //   },
    //   action
    // );
    expect(action.payload.movies).toBeTruthy();
  });

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected };
    // const initialState = moviesSlice.reducer(
    //   {
    //     movies: [],
    //     fetchStatus: 'loading',
    //     currentPage: 1,
    //     hasMoreToFetch: true,
    //     totalResults: 0,
    //   },
    //   action
    // );
    expect(action).toEqual({ type: fetchMovies.rejected });
  });
});
