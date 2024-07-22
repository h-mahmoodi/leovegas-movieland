import { useEffect, useState } from "react";

interface useInfiniteScrollProps {
  fetcher: () => void;
  hasMoreToFetch: boolean;
}

const useInfiniteScroll = ({
  fetcher,
  hasMoreToFetch,
}: useInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight ||
      isFetching ||
      !hasMoreToFetch
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMoreToFetch]);

  useEffect(() => {
    if (!isFetching) return;
    fetcher();
    setIsFetching(false);
  }, [isFetching]);

  return [isFetching];
};

export default useInfiniteScroll;
