import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

const HeaderLogo = () => {
  return (
    <Link to="/" data-testid="home" className="site-logo">
      <img src={Logo} alt="MovieLand LeoVegas" />
    </Link>
  );
};

export default HeaderLogo;
