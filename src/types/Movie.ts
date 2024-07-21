export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  adult: boolean;
  genres: number[];
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

export interface IMovieSummery {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}
