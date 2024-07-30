import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  loadWatchLaterMovies,
  saveWatchLaterMovies,
} from './thunks/watchLaterThunks';

import { type IMovieSummery } from '../types/Movie';

interface InitialState {
  movies: IMovieSummery[];
}

const initialState: InitialState = {
  movies: [],
};

const watchLaterSlice = createSlice({
  name: 'watchLater',
  initialState: initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = [action.payload, ...state.movies];
    },
    removeFromWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    removeAllWatchLater: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWatchLaterMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(saveWatchLaterMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const { addToWatchLater, removeFromWatchLater, removeAllWatchLater } =
  watchLaterSlice.actions;
export default watchLaterSlice.reducer;
