import { ComponentProps, type ReactNode } from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode;
  to: string;
  buttonStyle?: 'dark' | 'primary' | 'secondary';
  className?: string;
}

const buttonStyles = {
  dark: 'link link-dark',
  primary: 'link link-primary',
  secondary: 'link link-secondary'
};

const Link = ({ children, to, buttonStyle = 'dark', className, ...rest }: NavLinkProps) => {
  const classes = `${buttonStyles[buttonStyle]} ${className ? className : ''}`;
  return (
    <NavLinkRRD to={to} className={classes} {...rest}>
      {children}
    </NavLinkRRD>
  );
};

export default Link;
