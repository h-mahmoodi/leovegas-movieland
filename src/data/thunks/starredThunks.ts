import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadFromLocalStorage, saveToLocalStorage } from '../../lib/helpers';
import { STARRED_STORAGE_KEY } from '../../constants';

import { type IMovieSummery } from '../../types/Movie';

export const loadStarredMovies = createAsyncThunk(
  'starred/loadStarredMovies',
  async () => {
    return loadFromLocalStorage(STARRED_STORAGE_KEY);
  }
);

export const saveStarredMovies = createAsyncThunk(
  'starred/saveStarredMovies',
  async (movies: IMovieSummery[]) => {
    saveToLocalStorage(STARRED_STORAGE_KEY, movies);
    return movies;
  }
);
