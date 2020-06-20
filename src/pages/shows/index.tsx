import { Grid } from '@zeit-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import Tile from 'components/Tile';
import Loading from 'components/Loading';
import Header from 'components/Header';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import type { Shows } from 'type/show';

function getShows(page = 1): Promise<AxiosResponse<Shows>> {
  return axios.get<Shows>('/api/shows', {
    params: {
      params: `&page=${page}`,
    },
  });
}

export default function ShowsPage() {
  const router = useRouter();
  const { data, isFetching, fetchMore, isFetchingMore, canFetchMore } = useInfiniteQuery<Shows>({
    key: 'shows',
    promise: getShows,
  });

  const getMovieRoute = useCallback(
    (id: number) => {
      const push = () => router.push(`/shows/${id}`);
      return push;
    },
    [router],
  );

  useInfiniteScroll({ canFetchMore, isFetchingMore, fetchMore });

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid sm={21}>
          <Header />
        </Grid>
        {data?.map(({ results }) => {
          return results?.map(({ id, name, poster_path }) => {
            const push = getMovieRoute(id);

            return (
              <Grid key={id}>
                <Tile onClick={push} title={name} poster_path={poster_path} />
              </Grid>
            );
          });
        })}
        {(isFetching || isFetchingMore) && <Loading />}
      </Grid.Container>
    </>
  );
}
