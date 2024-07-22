import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";

interface InitialState {
  movies: IMovie[];
  fetchStatus?: "success" | "loading" | "error";
  currentPage: number;
  hasMoreToFetch: boolean;
  totalResults: number;
}

const initialState: InitialState = {
  movies: [],
  fetchStatus: "loading",
  currentPage: 1,
  hasMoreToFetch: true,
  totalResults: 0,
};
// https://api.themoviedb.org/3/discover/movie
// ?api_key=8cac6dec66e09ab439c081b251304443&sort_by=vote_count.desc&page=2

export const fetchMovies = createAsyncThunk(
  "fetch-movies",
  async ({ apiUrl, page }: { apiUrl: string; page: number }) => {
    const response = await fetch(`${apiUrl}&page=${page}`);
    const responseData = await response.json();
    // await new Promise((resolve, reject) => {
    //   setTimeout(resolve, 1000);
    // });
    return {
      movies: responseData.results,
      page: page,
      totalPages: responseData.total_pages,
      totalResults: responseData.total_results,
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
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
        state.fetchStatus = "success";
        state.currentPage = action.payload.page;
        state.hasMoreToFetch = action.payload.page < action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice;
