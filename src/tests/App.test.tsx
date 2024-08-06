import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';

it('renders watch later link', async () => {
  renderWithProviders(<App />);

  const linkElement = await screen.findAllByText(/watch later/i);
  expect(linkElement[0]).toBeInTheDocument();
});

it('search for movies', async () => {
  const user = userEvent.setup();
  renderWithProviders(
    <>
      <div id="modal"></div>
      <App />
    </>
  );
  await user.type(screen.getByTestId('search-movies'), 'forrest gump');
  const movieElement = await screen.findAllByText(
    'Through the Eyes of Forrest Gump'
  );
  expect(movieElement).toHaveLength(2);

  const viewTrailerBtn = await screen.findByTestId('watch-trailer');
  await user.click(viewTrailerBtn);
  await waitFor(() => {
    expect(screen.getByTestId('modal-video')).toBeInTheDocument();
  });
});

it('renders watch later component', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.click(screen.getAllByText(/watch later/i)[0]);
  expect(
    screen.getByText(/You have no movies saved to watch later/i)
  ).toBeInTheDocument();
});

it('renders starred component', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.click(screen.getAllByTestId('nav-starred')[0]);
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument();
  });
});
