import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from './utils';

it('Watch Later movie', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.type(screen.getByTestId('search-movies'), 'forrest gump');
  const movieElement = await screen.findAllByText(
    'Through the Eyes of Forrest Gump'
  );
  expect(movieElement).toHaveLength(2);

  const addToWatchLaterBtn = await screen.findByTestId('watch-later');
  expect(addToWatchLaterBtn).toBeInTheDocument();

  await userEvent.click(addToWatchLaterBtn);
  const removeFromWatchLaterBtn =
    await screen.findByTestId('remove-watch-later');
  expect(removeFromWatchLaterBtn).toBeInTheDocument();
  await user.click(removeFromWatchLaterBtn);
  expect(await screen.findByTestId('watch-later')).toBeInTheDocument();
});
