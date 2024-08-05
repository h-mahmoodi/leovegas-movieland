import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './utils';
import userEvent from '@testing-library/user-event';

describe('HeaderNav component', () => {
  it('renders correctly', async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
      const headerElement = screen.getAllByTestId('header-nav');
      expect(headerElement).toHaveLength(2);
    });
  });

  it('should show mobile nav when open button clicks', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await waitFor(async () => {
      const openButtonElement = screen.getByTestId('open-menu-btn');
      const mobileMenuElement = screen.getByTestId('mobile-menu');
      await user.click(openButtonElement);
      expect(mobileMenuElement).toHaveClass('sidebar-open');
    });
  });

  it('should hide mobile nav when close button clicks', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await waitFor(async () => {
      const openButtonElement = screen.getByTestId('close-menu-btn');
      const mobileMenuElement = screen.getByTestId('mobile-menu');
      await user.click(openButtonElement);
      expect(mobileMenuElement).toHaveClass('sidebar-close');
    });
  });
});
