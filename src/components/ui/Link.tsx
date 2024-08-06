import { ComponentProps, type ReactNode } from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';

interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode;
  to: string;
  linkStyle?: 'dark' | 'primary' | 'secondary';
  className?: string;
}

const linkStyles = {
  dark: 'link link-dark',
  primary: 'link link-primary',
  secondary: 'link link-secondary',
};

const Link = ({
  children,
  to,
  linkStyle = 'dark',
  className,
  ...rest
}: NavLinkProps) => {
  const classes = `${linkStyles[linkStyle]} ${className ? className : ''}`;
  return (
    <NavLinkRRD to={to} className={classes} {...rest}>
      {children}
    </NavLinkRRD>
  );
};

export default Link;
