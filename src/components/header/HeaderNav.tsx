import { NavLink } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";

const HeaderNav = () => {
  const { starredMovies } = useAppSelector((state) => state.starred);
  return (
    <nav>
      <NavLink
        to="/starred"
        data-testid="nav-starred"
        className="icon-button-primary has-badge"
      >
        {starredMovies.length > 0 ? (
          <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
          </>
        ) : (
          <>
            <i className="fi fi-rr-star"></i>
          </>
        )}
      </NavLink>
      <NavLink to="/watch-later" className="button-primary">
        <i className="fi fi-rr-video-duration"></i>
        <span>Watch Later</span>
      </NavLink>
    </nav>
  );
};

export default HeaderNav;
