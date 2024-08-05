import watchLaterSliceReducer, {
  addToWatchLater,
  removeFromWatchLater,
  removeAllWatchLater,
} from '../data/watchLaterSlice/watchLaterSlice';
import { moviesMock } from '../mocks/movies.mocks';
import { type IMovieSummery } from '../types/Movie';

describe('watchLaterSlice test', () => {
  const state: { movies: IMovieSummery[] } = { movies: [] };

  it('should set initial state', () => {
    const initialState = state;
    const action = { type: '' };
    const result = watchLaterSliceReducer(initialState, action);
    expect(result).toEqual({ movies: [] });
  });

  it('should add movie to watch later', () => {
    const initialState = { ...state, movies: [] };
    const action = addToWatchLater(moviesMock[0]);
    const result = watchLaterSliceReducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[0]);
  });

  it('should remove movie from watch later', () => {
    const initialState = { ...state, movies: moviesMock };
    const action = removeFromWatchLater(moviesMock[0]);
    const result = watchLaterSliceReducer(initialState, action);
    expect(result.movies[0]).toBe(moviesMock[1]);
  });

  it('should remove all movies', () => {
    const initialState = { ...state, movies: moviesMock };
    const action = removeAllWatchLater();
    const result = watchLaterSliceReducer(initialState, action);
    expect(Object.keys(result.movies).length).toEqual(0);
  });
});
