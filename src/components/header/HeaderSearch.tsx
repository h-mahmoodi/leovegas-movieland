const HeaderSearch = () => {
  return (
    <label className="search">
      <span className="">
        <i className="fi fi-rr-search"></i>
      </span>
      <input
        type="search"
        data-testid="search-movies"
        // onKeyUp={(e) => searchMovies(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
        aria-describedby="search-addon"
      />
    </label>
  );
};

export default HeaderSearch;
