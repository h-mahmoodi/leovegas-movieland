import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header>
      <div className="container header">
        <HeaderLogo />

        <div className="navbar">
          <HeaderNav />

          <HeaderSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
