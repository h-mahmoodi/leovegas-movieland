import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';

it('search for a movie , movies starred and saved to watch later', async () => {
  renderWithProviders(
    <>
      <div id="modal"></div>
      <App />
    </>
  );
  const user = userEvent.setup();

  // await user.type(screen.getByTestId('search-movies'), 'Forrest');
  // await waitFor(() => {
  //   const movieElements = screen.queryAllByText(/forrest gump/i);
  //   console.log('Movie elements found:', movieElements);
  //   expect(movieElements.length).toBeGreaterThan(0);
  // });

  // test to find the movie after search
  await user.type(screen.getByTestId('search-movies'), 'Forrest');
  await waitFor(() => {
    const movieElement = screen.getAllByText(/Forrest Gump/i)[0];
    expect(movieElement).toBeInTheDocument();
  });

  // test for starredMovie btn
  const starMovieLink = screen.getAllByTestId('starred-link')[0];
  expect(starMovieLink).toBeInTheDocument();
  await waitFor(() => {});

  await user.click(starMovieLink);

  await waitFor(() => {
    expect(screen.getAllByTestId('star-fill')[0]).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getAllByTestId('unstar-link')[0]).toBeInTheDocument();
  });

  //test for watchLater btn
  const addToWatchLaterBtn = (await screen.findAllByTestId('watch-later'))[0];
  await waitFor(() => {
    expect(addToWatchLaterBtn).toBeInTheDocument();
  });

  await user.click(addToWatchLaterBtn);

  const removeFromWatchLaterBtn =
    screen.getAllByTestId('remove-watch-later')[0];

  await waitFor(() => {
    expect(removeFromWatchLaterBtn).toBeInTheDocument();
  });

  await user.click(removeFromWatchLaterBtn);
  await waitFor(() => {
    expect(screen.getAllByTestId('watch-later')[0]).toBeInTheDocument();
  });
});

// it('movies starred and saved to watch later', async () => {
//   renderWithProviders(
//     <>
//       <div id="modal"></div>
//       <App />
//     </>
//   );

//   await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
//   await waitFor(() => {
//     expect(
//       screen.getAllByText('Through the Eyes of Forrest Gump')[1]
//     ).toBeInTheDocument();
//   });
//   const starMovieLink = screen.getAllByTestId('starred-link')[0];
//   await waitFor(() => {
//     expect(starMovieLink).toBeInTheDocument();
//   });
//   await userEvent.click(starMovieLink);
//   await waitFor(() => {
//     expect(screen.getByTestId('star-fill')).toBeInTheDocument();
//   });
//   await waitFor(() => {
//     expect(screen.getByTestId('unstar-link')).toBeInTheDocument();
//   });

//   const watchLaterLink = screen.getAllByTestId('watch-later')[0];
//   await waitFor(() => {
//     expect(watchLaterLink).toBeInTheDocument();
//   });
//   await userEvent.click(watchLaterLink);
//   await waitFor(() => {
//     expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument();
//   });

//   await userEvent.click(screen.getAllByTestId('remove-watch-later')[0]);
// });
