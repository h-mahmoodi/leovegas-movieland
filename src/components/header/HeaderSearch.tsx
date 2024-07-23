import { FormEvent, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('title');
  const [searchText, setSearchText] = useState<string>(searchQuery || '');
  const debounceValue = useDebounce(searchText, 400);
  const [isLoading, setIsLoading] = useState(false);

  const navigateHandler = (searchedTitle: string) => {
    navigate({
      pathname: '/search',
      search: createSearchParams({
        title: searchedTitle
      }).toString()
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigateHandler(searchText);
  };

  useEffect(() => {
    setIsLoading(true);
  }, [searchText]);

  useEffect(() => {
    navigateHandler(debounceValue);
    setIsLoading(false);
  }, [debounceValue]);

  useEffect(() => {
    if (!debounceValue) {
      navigate('/');
      setIsLoading(false);
    }
  }, [debounceValue]);

  return (
    <form onSubmit={submitHandler}>
      <label className="search">
        <span className="">
          {isLoading && <i className="spinner fi fi-rr-spinner"></i>}
          {!isLoading && <i className="fi fi-rr-search"></i>}
        </span>
        <input
          type="search"
          name="searcg"
          data-testid="search-movies"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </label>
    </form>
  );
};

export default HeaderSearch;
