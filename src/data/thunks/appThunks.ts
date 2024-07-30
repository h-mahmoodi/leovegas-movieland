import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_MOVIE } from '../../constants';

export const fetchTrailer = createAsyncThunk(
  'app/fetchTrailer',
  async (id: string) => {
    const URL = ENDPOINT_MOVIE.replace('<MOVIE_ID>', id);
    const videoData = await fetch(URL).then((response) => response.json());
    if (videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid: Record<string, unknown>) => vid.type === 'Trailer'
      );
      const trailerKey = trailer
        ? trailer.key
        : videoData.videos.results[0].key;
      return trailerKey;
    }
  }
);
