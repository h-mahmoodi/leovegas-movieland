import { useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
  fetcher: () => void;
  hasMoreToFetch: boolean;
}

const useInfiniteScroll = ({
  fetcher,
  hasMoreToFetch,
}: useInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMoreToFetch) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetcher();
      }
    });

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [fetcher, hasMoreToFetch]);

  return loaderRef;
};

export default useInfiniteScroll;
