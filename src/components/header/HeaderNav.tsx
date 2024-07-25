import { useRef, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import Button from '../ui/Button';
import Link from '../ui/Link';
import useClickOutSide from '../../hooks/useClickOutSide';

const HeaderNav = () => {
  const { movies: starMovies } = useAppSelector((state) => state.starred);
  const { movies: watchLaterMovies } = useAppSelector((state) => state.watchLater);
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutSide(ref, () => setSidebar(false));
  return (
    <>
      <nav className="desktop-nav">
        <Link to="/starred" data-testid="nav-starred" className="has-badge">
          <i className="fi fi-rr-wishlist-star" />
          <span>Starred</span>
          {starMovies.length > 0 && <sup className="star-number">{starMovies.length}</sup>}
        </Link>
        <Link to="/watch-later" className="has-badge">
          <i className="fi fi-rr-video-duration"></i>
          <span>Watch Later</span>
          {watchLaterMovies.length > 0 && (
            <sup className="star-number">{watchLaterMovies.length}</sup>
          )}
        </Link>
      </nav>
      <nav className="mobile-nav">
        <Button onClick={() => setSidebar(true)}>
          <i className="fi fi-rr-menu-burger"></i>
        </Button>
        <div
          ref={ref}
          className={`mobile-nav_sidebar ${sidebar ? 'sidebar-open' : 'sidebar-close'}`}>
          <div className="mobile-nav_sidebar-close-btn">
            <Button onClick={() => setSidebar(false)}>
              <i className="fi fi-rr-cross"></i>
            </Button>
          </div>
          <Link to="/" className="has-badge">
            <i className="fi fi-rr-home" />
            <span>Home</span>
          </Link>
          <Link to="/starred" data-testid="nav-starred" className="has-badge">
            <i className="fi fi-rr-wishlist-star" />
            <span>Starred</span>
            {starMovies.length > 0 && <sup className="star-number">{starMovies.length}</sup>}
          </Link>
          <Link to="/watch-later" className="has-badge">
            <i className="fi fi-rr-video-duration"></i>
            <span>Watch Later</span>
            {watchLaterMovies.length > 0 && (
              <sup className="star-number">{watchLaterMovies.length}</sup>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default HeaderNav;
