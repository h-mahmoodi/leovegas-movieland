import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, ENDPOINT } from "../constants";
import { IMovie } from "../types/Movie";

interface InitialState {
  isModal: boolean;
  loadingTrailer?: "success" | "loading" | "error";
  trailerKey: string | null;
  movie: { title: string; overview: string };
}

const initialState: InitialState = {
  isModal: false,
  loadingTrailer: "loading",
  trailerKey: null,
  movie: { title: "", overview: "" },
};

export const fetchTrailer = createAsyncThunk(
  "fetch-trailer",
  async (id: string) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    const videoData = await fetch(URL).then((response) => response.json());
    if (videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid: Record<string, unknown>) => vid.type === "Trailer"
      );
      const trailerKey = trailer
        ? trailer.key
        : videoData.videos.results[0].key;
      return trailerKey;
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModal = true;
    },
    closeModal: (state) => {
      state.isModal = false;
      state.loadingTrailer = "loading";
      state.trailerKey = null;
      state.movie.title = "";
      state.movie.overview = "";
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
        state.loadingTrailer = "success";
      })
      .addCase(fetchTrailer.pending, (state) => {
        state.loadingTrailer = "loading";
      })
      .addCase(fetchTrailer.rejected, (state) => {
        state.loadingTrailer = "error";
      });
  },
});
export default appSlice;
