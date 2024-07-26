import starredSlice from '../data/starredSlice';
import { IMovieSummery } from '../types/Movie';
import { moviesMock } from './movies.mocks';

describe('starredSlice test', () => {
  const state: { movies: IMovieSummery[] } = { movies: [] };

  it('should set an initial state', () => {
    const initialState = state;
    const action = { type: '' };
    const result = starredSlice.reducer(initialState, action);
    expect(result).toEqual({ movies: [] });
  });

  it('should add movie to starred', () => {
    const initialState = { ...state, movies: [] };
    const action = starredSlice.actions.starMovie(moviesMock[0]);
    const result = starredSlice.reducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[0]);
  });

  it('should remove movie from starred', () => {
    const initialState = { ...state, movies: moviesMock };
    const action = starredSlice.actions.unstarMovie(moviesMock[0]);
    const result = starredSlice.reducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[1]);
  });

  it('should remove all movies', () => {
    const initialState = {
      ...state,
      movies: moviesMock,
    };
    const action = starredSlice.actions.clearAllStarred();
    const result = starredSlice.reducer(initialState, action);
    expect(Object.keys(result.movies).length).toEqual(0);
  });
});
