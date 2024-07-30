import { createAsyncThunk } from '@reduxjs/toolkit';

import { type IMovie, type IMovieSummery } from '../../types/Movie';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ apiUrl, page }: { apiUrl: string; page: number }) => {
    const response = await fetch(`${apiUrl}&page=${page}`);
    const responseData = await response.json();

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
