import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type IMovieSummery } from '../types/Movie';

interface InitialState {
  movies: IMovieSummery[];
}

const initialState: InitialState = {
  movies: []
};

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = [action.payload, ...state.movies];
    },
    unstarMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
    },
    clearAllStarred: (state) => {
      state.movies = [];
    }
  }
});

export default starredSlice;
