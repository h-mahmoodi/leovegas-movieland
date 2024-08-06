import starredSliceReducer, {
  starMovie,
  unstarMovie,
  clearAllStarred,
} from '../data/starredSlice/starredSlice';
import { IMovieSummery } from '../types/Movie';
import { moviesMock } from '../mocks/movies.mocks';

describe('starredSlice test', () => {
  const state: { movies: IMovieSummery[] } = { movies: [] };

  it('should set an initial state', () => {
    const initialState = state;
    const action = { type: '' };
    const result = starredSliceReducer(initialState, action);
    expect(result).toEqual({ movies: [] });
  });

  it('should add movie to starred', () => {
    const initialState = { ...state, movies: [] };
    const action = starMovie(moviesMock[0]);
    const result = starredSliceReducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[0]);
  });

  it('should remove movie from starred', () => {
    const initialState = { ...state, movies: moviesMock };
    const action = unstarMovie(moviesMock[0]);
    const result = starredSliceReducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[1]);
  });

  it('should remove all movies', () => {
    const initialState = {
      ...state,
      movies: moviesMock,
    };
    const action = clearAllStarred();
    const result = starredSliceReducer(initialState, action);
    expect(Object.keys(result.movies).length).toEqual(0);
  });
});
