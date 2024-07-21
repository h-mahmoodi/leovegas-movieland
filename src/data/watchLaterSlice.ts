import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieSummery } from "../types/Movie";

interface InitialState {
  watchLaterMovies: IMovieSummery[];
}

const initialState: InitialState = {
  watchLaterMovies: [],
};

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState: initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },
    removeFromWatchLater: (state, action: PayloadAction<IMovieSummery>) => {
      //   const indexOfId = state.watchLaterMovies.findIndex(
      //     (key) => key.id === action.payload.id
      //   );
      //   state.watchLaterMovies.splice(indexOfId, 1);

      state.watchLaterMovies = state.watchLaterMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    remveAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export default watchLaterSlice;
