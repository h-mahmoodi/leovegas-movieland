import { rest } from 'msw';
import { moviesMock } from './movies.mocks';

const handlers = [
  rest.get('https://api.themoviedb.org/3/discover/movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: moviesMock }));
  }),
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    const searchQuery = req.url.searchParams.get('query') || '';

    const searchResults = moviesMock.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return res(ctx.status(200), ctx.json({ results: searchResults }));
  }),
  rest.get('https://api.themoviedb.org/3/movie/:movieId', (req, res, ctx) => {
    const { movieId } = req.params;
    const movie = moviesMock.find((movie) => movie.id === +movieId);
    return res(
      ctx.status(200),
      ctx.json({
        ...movie,
        videos: {
          results: [],
        },
      })
    );
  }),
];

export default handlers;
