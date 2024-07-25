import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { type IMovie, type IMovieSummery } from '../types/Movie';

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

export const fetchMovies = createAsyncThunk(
  'fetch-movies',
  async ({ apiUrl, page }: { apiUrl: string; page: number }) => {
    const response = await fetch(`${apiUrl}&page=${page}`);
    const responseData = await response.json();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    const normalizedMovies: IMovieSummery[] = responseData.results.map(
      (movie: IMovie) => ({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
        vote_average: movie.vote_average,
      })
    );
    return {
      movies: normalizedMovies,
      page: page,
      totalPages: responseData.total_pages,
      totalResults: responseData.total_results,
    };
  }
);

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

export default moviesSlice;
