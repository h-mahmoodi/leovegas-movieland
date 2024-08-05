import { type IMovieSummery } from '../../types/Movie';

export interface InitialState {
  movies: IMovieSummery[];
  fetchStatus: 'success' | 'loading' | 'error';
  currentPage: number;
  hasMoreToFetch: boolean;
  totalResults: number;
}
