import { ArrowLeftCircle } from '@zeit-ui/react-icons';
import { Grid, Card } from '@zeit-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import Tile from 'components/Tile';
import Loading from 'components/Loading';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import type { Movies } from 'type/movies';

function getMovies(page = 1): Promise<AxiosResponse<Movies>> {
  return axios.get<Movies>('/api/movies', {
    params: {
      params: `&page=${page}`,
    },
  });
}

export default function MoviesPage() {
  const router = useRouter();
  const { data, isFetching, fetchMore, isFetchingMore, canFetchMore } = useInfiniteQuery<Movies>({
    key: 'movies',
    promise: getMovies,
  });

  const goBack = useCallback(() => {
    router.back();
  }, [router]);
  const getMovieRoute = useCallback(
    (id: number) => {
      const push = () => router.push(`/movies/${id}`);
      return push;
    },
    [router],
  );

  useInfiniteScroll({ canFetchMore, isFetchingMore, fetchMore });

  return (
    <Grid.Container gap={2} justify="center">
      <Grid sm={21}>
        <Card onClick={goBack}>
          <ArrowLeftCircle />
        </Card>
      </Grid>
      {data?.map(({ results }) => {
        return results?.map(({ id, title, poster_path, adult }) => {
          if(adult) {
            return null;
          }
          
          const push = getMovieRoute(id);

          return (
            <Grid key={id}>
              <Tile onClick={push} title={title} poster_path={poster_path} />
            </Grid>
          );
        });
      })}
      {(isFetching || isFetchingMore) && <Loading />}
    </Grid.Container>
  );
}
