import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from './utils';
import { screen, waitFor } from '@testing-library/react';

describe('Modal component', () => {
  const user = userEvent.setup();

  it('render modal after click on the trailer btn', async () => {
    renderWithProviders(
      <>
        <div id="modal"></div>
        <App />
      </>
    );

    await user.type(screen.getByTestId('search-movies'), 'Interstellar');
    const movieElement = await screen.findAllByText('Interstellar');
    expect(movieElement).toHaveLength(2);

    const viewTrailerBtn = await screen.findByTestId('watch-trailer');
    await user.click(viewTrailerBtn);
    await waitFor(() => {
      expect(screen.getByTestId('modal-video')).toBeInTheDocument();
    });
  });
});
