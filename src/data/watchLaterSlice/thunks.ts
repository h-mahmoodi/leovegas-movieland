import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadFromLocalStorage, saveToLocalStorage } from '../../lib/helpers';
import { WATCH_LATER_STORAGE_KEY } from '../../constants';

import { type IMovieSummery } from '../../types/Movie';

export const loadWatchLaterMovies = createAsyncThunk(
  'watchLater/loadWatchLaterMovies',
  async () => {
    return loadFromLocalStorage(WATCH_LATER_STORAGE_KEY);
  }
);

export const saveWatchLaterMovies = createAsyncThunk(
  'watchLater/saveWatchLaterMovies',
  async (movies: IMovieSummery[]) => {
    saveToLocalStorage(WATCH_LATER_STORAGE_KEY, movies);
    return movies;
  }
);
