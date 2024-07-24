import useAppSelector from '../../hooks/useAppSelector';
import Link from '../ui/Link';

const HeaderNav = () => {
  const { movies: starMovies } = useAppSelector((state) => state.starred);
  const { movies: watchLaterMovies } = useAppSelector((state) => state.watchLater);
  return (
    <nav>
      <Link to="/starred" data-testid="nav-starred" className="has-badge">
        <i className="fi fi-sr-wishlist-star" />
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
  );
};

export default HeaderNav;
