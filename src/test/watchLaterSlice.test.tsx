import watchLaterSlice from '../data/watchLaterSlice';
import { IMovieSummery } from '../types/Movie';
import { moviesMock } from './movies.mocks';

describe('watchLaterSlice test', () => {
  const state: { movies: IMovieSummery[] } = { movies: [] };

  it('should set initial state', () => {
    const initialState = state;
    const action = { type: '' };
    const result = watchLaterSlice.reducer(initialState, action);
    expect(result).toEqual({ movies: [] });
  });

  it('should add movie to watch later', () => {
    const initialState = { ...state, movies: [] };
    const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0]);
    const result = watchLaterSlice.reducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[0]);
  });

  it('should remove movie from watch later', () => {
    const initialState = { ...state, movies: moviesMock };
    const action = watchLaterSlice.actions.removeFromWatchLater(moviesMock[0]);
    const result = watchLaterSlice.reducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[1]);
  });

  it('should remove all movies', () => {
    const initialState = { ...state, movies: moviesMock };
    const action = watchLaterSlice.actions.remveAllWatchLater();
    const result = watchLaterSlice.reducer(initialState, action);
    expect(Object.keys(result.movies).length).toEqual(0);
  });
});
