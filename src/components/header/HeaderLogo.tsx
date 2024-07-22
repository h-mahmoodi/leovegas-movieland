import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/" data-testid="home" className="site-logo">
      <i className="fi fi-rr-clapperboard-play "></i>
      <span>MovieLand LeoVegas</span>
    </Link>
  );
};

export default HeaderLogo;
