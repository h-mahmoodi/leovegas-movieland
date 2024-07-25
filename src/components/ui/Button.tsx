import { ComponentProps, type ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  onClick: () => void;
  buttonStyle?: 'dark' | 'primary' | 'secondary';
  className?: string;
}

const buttonStyles = {
  dark: 'button button-dark',
  primary: 'button button-primary',
  secondary: 'button button-secondary',
};

const Button = ({
  children,
  onClick,
  buttonStyle = 'dark',
  className,
  ...rest
}: ButtonProps) => {
  const classes = `${buttonStyles[buttonStyle]} ${className ? className : ''}`;
  return (
    <button onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
