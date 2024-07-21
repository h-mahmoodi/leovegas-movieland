import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieSummery } from "../types/Movie";

interface InitialState {
  starredMovies: IMovieSummery[];
}

const initialState: InitialState = {
  starredMovies: [],
};

const starredSlice = createSlice({
  name: "starred",
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    unstarMovie: (state, action: PayloadAction<IMovieSummery>) => {
      state.starredMovies = state.starredMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice;
