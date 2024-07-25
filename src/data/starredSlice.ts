import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type IMovieSummery } from '../types/Movie';
import { STARRED_STORAGE_KEY } from '../constants';
import { loadFromLocalStorage, saveToLocalStorage } from '../lib/helpers';

interface InitialState {
  movies: IMovieSummery[];
}

const initialState: InitialState = {
  movies: loadFromLocalStorage(STARRED_STORAGE_KEY),
};

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = [action.payload, ...state.movies];
      saveToLocalStorage<IMovieSummery[]>(STARRED_STORAGE_KEY, state.movies);
    },
    unstarMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      saveToLocalStorage<IMovieSummery[]>(STARRED_STORAGE_KEY, state.movies);
    },
    clearAllStarred: (state) => {
      state.movies = [];
    },
  },
});

export default starredSlice;
