import { useCallback, useEffect, useState } from 'react';
import { ENDPOINT_MOVIE } from '../constants';

interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface MovieData {
  videos: {
    results: VideoResult[];
  };
}

const useLoadTrailer = (movieId: number) => {
  const [trailerKey, setTrailerKey] = useState<string>('');
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>(
    'loading'
  );

  const fetchTrailer = useCallback(async () => {
    setStatus('loading');
    try {
      const URL = ENDPOINT_MOVIE.replace('<MOVIE_ID>', movieId.toString());
      const videoData: MovieData = await fetch(URL).then((response) =>
        response.json()
      );
      if (videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(
          (vid) => vid.type === 'Trailer'
        );
        const trailerKey = trailer
          ? trailer.key
          : videoData.videos.results[0].key;
        setTrailerKey(trailerKey);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.warn(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchTrailer();
  }, [fetchTrailer]);

  return { status, trailerKey };
};

export default useLoadTrailer;
