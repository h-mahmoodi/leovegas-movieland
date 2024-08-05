import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from './utils';

it('Starred movie', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.type(screen.getByTestId('search-movies'), 'forrest gump');
  const movieElement = await screen.findAllByText(
    'Through the Eyes of Forrest Gump'
  );
  expect(movieElement).toHaveLength(2);

  const addToStarredMoviesBtn = await screen.findByTestId('starred-link');
  expect(addToStarredMoviesBtn).toBeInTheDocument();

  await userEvent.click(addToStarredMoviesBtn);
  const removeFromStarredMoviesBtn = await screen.findByTestId('unstar-link');
  expect(removeFromStarredMoviesBtn).toBeInTheDocument();
  await user.click(removeFromStarredMoviesBtn);
  expect(await screen.findByTestId('starred-link')).toBeInTheDocument();
});
