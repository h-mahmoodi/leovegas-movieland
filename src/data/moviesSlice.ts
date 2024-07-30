import { createSlice } from '@reduxjs/toolkit';

import { fetchMovies } from './thunks/moviesThunks';

import { type IMovieSummery } from '../types/Movie';

interface InitialState {
  movies: IMovieSummery[];
  fetchStatus?: 'success' | 'loading' | 'error';
  currentPage: number;
  hasMoreToFetch: boolean;
  totalResults: number;
}

const initialState: InitialState = {
  movies: [],
  fetchStatus: 'loading',
  currentPage: 1,
  hasMoreToFetch: true,
  totalResults: 0,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovies(state) {
      state.movies = [];
      state.currentPage = 1;
      state.hasMoreToFetch = true;
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.movies];
        state.fetchStatus = 'success';
        state.currentPage = action.payload.page;
        state.hasMoreToFetch = action.payload.page < action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error';
      });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
