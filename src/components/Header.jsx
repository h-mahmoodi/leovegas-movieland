import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred);

  return (
    <header>
      <Link
        to="/"
        data-testid="home"
        onClick={() => searchMovies("")}
        className="site-logo"
      >
        <i class="fi fi-rr-clapperboard-play "></i>
        <span>Leo Vegas MovieLand</span>
      </Link>

      <div className="navContainer">
        <nav>
          <NavLink
            to="/starred"
            data-testid="nav-starred"
            className="icon-button-primary"
          >
            {starredMovies.length > 0 ? (
              <>
                <i className="bi bi-star-fill bi-star-fill-white" />
                <sup className="star-number">{starredMovies.length}</sup>
              </>
            ) : (
              <>
                <i class="fi fi-rr-star"></i>
              </>
            )}
          </NavLink>
          <NavLink to="/watch-later" className="button-primary">
            <i class="fi fi-rr-play"></i>
            <span>Watch Later</span>
          </NavLink>
        </nav>

        <label className="search">
          <span className="">
            <i class="fi fi-rr-search"></i>
          </span>
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={(e) => searchMovies(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </label>
      </div>
    </header>
  );
};

export default Header;
