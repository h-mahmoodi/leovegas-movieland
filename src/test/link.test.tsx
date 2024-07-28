import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Link from './../components/ui/Link';

describe('Link component', () => {
  it('renders with default style', () => {
    render(
      <MemoryRouter>
        <Link to="/default">Default Link</Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: /default link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('link link-dark');
  });

  it('renders with primary style', () => {
    render(
      <MemoryRouter>
        <Link to="/primary" linkStyle="primary">
          Primary Link
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: /primary link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('link link-primary');
  });

  it('renders with secondary style', () => {
    render(
      <MemoryRouter>
        <Link to="/secondary" linkStyle="secondary">
          Secondary Link
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: /secondary link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('link link-secondary');
  });

  it('applies additional className', () => {
    render(
      <MemoryRouter>
        <Link to="/extra-class" className="extra-class">
          Link with Extra Class
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', {
      name: /link with extra class/i,
    });
    expect(linkElement).toHaveClass('link link-dark extra-class');
  });

  it('renders with the correct href attribute', () => {
    render(
      <MemoryRouter>
        <Link to="/test-href">Test Href</Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: /test href/i });
    expect(linkElement).toHaveAttribute('href', '/test-href');
  });
});
