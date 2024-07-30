import { createSlice } from '@reduxjs/toolkit';

import { fetchTrailer } from './thunks/appThunks';

interface InitialState {
  isModal: boolean;
  loadingTrailer?: 'success' | 'loading' | 'error';
  trailerKey: string | null;
  movie: { title: string; overview: string };
}

const initialState: InitialState = {
  isModal: false,
  loadingTrailer: 'loading',
  trailerKey: null,
  movie: { title: '', overview: '' },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModal = true;
    },
    closeModal: (state) => {
      state.isModal = false;
      state.loadingTrailer = 'loading';
      state.trailerKey = null;
      state.movie.title = '';
      state.movie.overview = '';
    },
    movieDetails: (state, action) => {
      state.movie.title = action.payload.title;
      state.movie.overview = action.payload.overview;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.trailerKey = action.payload;
        state.loadingTrailer = 'success';
      })
      .addCase(fetchTrailer.pending, (state) => {
        state.loadingTrailer = 'loading';
      })
      .addCase(fetchTrailer.rejected, (state) => {
        state.loadingTrailer = 'error';
      });
  },
});

export const { openModal, closeModal, movieDetails } = appSlice.actions;
export default appSlice.reducer;
