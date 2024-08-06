import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';

it('search for a movie , movies starred and saved to watch later', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);

  // test to find the movie after search
  await user.type(screen.getByTestId('search-movies'), 'Forrest Gump');
  const movieElement = await screen.findAllByText(
    'Through the Eyes of Forrest Gump'
  );
  expect(movieElement).toHaveLength(2);

  // test for starredMovie btn
  const starMovieLink = await screen.findByTestId('starred-link');
  expect(starMovieLink).toBeInTheDocument();
  await user.click(starMovieLink);
  expect(screen.getByTestId('star-fill')).toBeInTheDocument();
  expect(screen.getByTestId('unstar-link')).toBeInTheDocument();

  // //test for watchLater btn
  const addToWatchLaterBtn = await screen.findByTestId('watch-later');
  expect(addToWatchLaterBtn).toBeInTheDocument();
  await user.click(addToWatchLaterBtn);
  const removeFromWatchLaterBtn =
    await screen.findByTestId('remove-watch-later');
  expect(removeFromWatchLaterBtn).toBeInTheDocument();
  await user.click(removeFromWatchLaterBtn);
  expect(await screen.findByTestId('watch-later')).toBeInTheDocument();
});
