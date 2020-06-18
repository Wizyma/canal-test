import { useInfiniteQuery as useInfiniteQueryDefault } from 'react-query';

import type { AxiosResponse } from 'axios';

export function useInfiniteQuery<T = unknown>({
  key,
  promise,
}: {
  key: string;
  promise: (page: number) => Promise<AxiosResponse<T>>;
}) {
  const { data, isFetching, fetchMore, isFetchingMore, canFetchMore } = useInfiniteQueryDefault<
    T,
    string,
    number
  >(
    key,
    async (_, page: number) => {
      const { data } = await promise(page);
      return data;
    },
    {
      getFetchMore: (data) => {
        // @ts-ignore
        if (data.page < data.total_pages) {
          // @ts-ignore
          return data.page + 1;
        }

        return null;
      },
    },
  );

  return {
    data,
    isFetching,
    fetchMore,
    isFetchingMore,
    canFetchMore,
  };
}
