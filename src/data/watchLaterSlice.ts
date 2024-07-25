import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type IMovieSummery } from '../types/Movie';
import { loadFromLocalStorage, saveToLocalStorage } from '../lib/helpers';
import { WATCH_LATER_STORAGE_KEY } from '../constants';

interface InitialState {
  movies: IMovieSummery[];
}

const initialState: InitialState = {
  movies: loadFromLocalStorage(WATCH_LATER_STORAGE_KEY),
};

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = [action.payload, ...state.movies];
      saveToLocalStorage<IMovieSummery[]>(
        WATCH_LATER_STORAGE_KEY,
        state.movies
      );
    },
    removeFromWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      saveToLocalStorage<IMovieSummery[]>(
        WATCH_LATER_STORAGE_KEY,
        state.movies
      );
    },
    remveAllWatchLater: (state) => {
      state.movies = [];
    },
  },
});

export default watchLaterSlice;
