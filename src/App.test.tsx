import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test/utils';
import App from './App';

it('renders watch later link', async () => {
  renderWithProviders(<App />);

  await waitFor(async () => {
    const linkElement = screen.getAllByText(/watch later/i);
    expect(linkElement[0]).toBeInTheDocument();
  });
});

it('search for movies', async () => {
  renderWithProviders(
    <>
      <div id="modal"></div>
      <App />
    </>
  );
  const user = userEvent.setup();
  await user.type(screen.getByTestId('search-movies'), 'forrest gump');
  await waitFor(
    () => {
      expect(
        screen.getAllByText(/Through the Eyes of Forrest Gump/i)[0]
      ).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  const viewTrailerBtn = screen.getAllByTestId('watch-trailer')[0];
  await user.click(viewTrailerBtn);
  await waitFor(() => {
    expect(screen.getByTestId('modal-video')).toBeInTheDocument();
  });
});

it('renders watch later component', async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getAllByText(/watch later/i)[0]);
  expect(
    screen.getByText(/You have no movies saved to watch later/i)
  ).toBeInTheDocument();
});

it('renders starred component', async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getAllByTestId('nav-starred')[0]);
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument();
  });
});
