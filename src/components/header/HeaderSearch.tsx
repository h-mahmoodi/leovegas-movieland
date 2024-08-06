import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('title');
  const [searchText, setSearchText] = useState<string>(searchQuery || '');
  const debounceValue = useDebounce(searchText, 400);
  const [isLoading, setIsLoading] = useState(false);

  const navigateHandler = (searchedTitle: string) => {
    navigate({
      pathname: '/search',
      search: createSearchParams({
        title: searchedTitle,
      }).toString(),
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigateHandler(searchText);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchText(e.target.value);
    if (!e.target.value) {
      setIsLoading(false);
      navigate('/');
    }
  };

  useEffect(() => {
    if (debounceValue) {
      navigateHandler(debounceValue);
      setIsLoading(false);
    }
  }, [debounceValue]);

  return (
    <form onSubmit={submitHandler}>
      <label className="search">
        <span className="">
          {isLoading ? (
            <i className="spinner fi fi-rr-spinner"></i>
          ) : (
            <i className="fi fi-rr-search"></i>
          )}
        </span>
        <input
          type="search"
          name="search"
          data-testid="search-movies"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
          value={searchText}
          onChange={onChangeHandler}
        />
      </label>
    </form>
  );
};

export default HeaderSearch;
