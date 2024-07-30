import { createSlice } from '@reduxjs/toolkit';

import { fetchMovies } from './thunks/moviesThunks';

import { type IMovieSummery } from '../types/Movie';

interface InitialState {
  movies: IMovieSummery[];
  fetchStatus: 'success' | 'loading' | 'error';
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
      state.fetchStatus = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { movies, page, totalPages, totalResults } = action.payload;
        state.movies = [...state.movies, ...movies];
        state.fetchStatus = 'success';
        state.currentPage = page;
        state.hasMoreToFetch = action.payload.page < totalPages;
        state.totalResults = totalResults;
        if (movies.length === 0) {
          state.hasMoreToFetch = false;
        }
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
