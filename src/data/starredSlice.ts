import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadStarredMovies, saveStarredMovies } from './thunks/starredThunks';

import { type IMovieSummery } from '../types/Movie';

interface InitialState {
  movies: IMovieSummery[];
}

const initialState: InitialState = {
  movies: [],
};

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = [action.payload, ...state.movies];
    },
    unstarMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    clearAllStarred: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStarredMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(saveStarredMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;
export default starredSlice.reducer;
