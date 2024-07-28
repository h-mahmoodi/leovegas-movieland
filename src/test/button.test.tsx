import { render, screen } from '@testing-library/react';
import Button from '../components/ui/Button';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('renders with default style', () => {
    render(<Button onClick={() => {}}>Default Button</Button>);
    const buttonElement = screen.getByRole('button', {
      name: /default button/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button button-dark');
  });

  it('renders with primary style', () => {
    render(
      <Button onClick={() => {}} buttonStyle="primary">
        Primary Button
      </Button>
    );
    const buttonElement = screen.getByRole('button', {
      name: /primary button/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button button-primary');
  });

  it('renders with secondary style', () => {
    render(
      <Button onClick={() => {}} buttonStyle="secondary">
        Secondary Button
      </Button>
    );
    const buttonElement = screen.getByRole('button', {
      name: /secondary button/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button button-secondary');
  });

  it('handles click event', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const user = userEvent.setup();
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    await user.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies additional className', () => {
    render(
      <Button onClick={() => {}} className="extra-class">
        Button with Extra Class
      </Button>
    );
    const buttonElement = screen.getByRole('button', {
      name: /button with extra class/i,
    });
    expect(buttonElement).toHaveClass('button button-dark extra-class');
  });
});
