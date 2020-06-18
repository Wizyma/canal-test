import { useCallback, useEffect } from 'react';

export function useInfiniteScroll({
  canFetchMore,
  isFetchingMore,
  fetchMore,
}: {
  canFetchMore: boolean;
  isFetchingMore: boolean;
  fetchMore: (variables?: unknown) => Promise<unknown>;
}) {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return;
    }

    if (canFetchMore && !isFetchingMore) {
      fetchMore();
    }
  }, [canFetchMore, fetchMore, isFetchingMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}
