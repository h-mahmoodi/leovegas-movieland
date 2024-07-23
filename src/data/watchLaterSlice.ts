import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type IMovieSummery } from '../types/Movie';

interface InitialState {
  movies: IMovieSummery[];
}

const initialState: InitialState = {
  movies: []
};

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = [action.payload, ...state.movies];
    },
    removeFromWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
    },
    remveAllWatchLater: (state) => {
      state.movies = [];
    }
  }
});

export default watchLaterSlice;
