import { ArrowLeftCircle } from '@zeit-ui/react-icons';
import { GetStaticProps, GetStaticPaths } from 'next'
import YouTube from 'react-youtube';
import { Grid, Card, Text, Spacer } from '@zeit-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { AxiosResponse } from 'axios';

import Fetcher from 'fetcher';
import Loading from 'components/Loading'
import type { Movie } from 'type/movies';
import Tile from 'components/Tile';


function MoviePage({ movie }: { movie: Movie }) {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);
  
  if(router.isFallback) {
    return <Loading />
  }
  const videos = movie?.videos?.results?.filter(({ site }) => site.toLowerCase() === 'youtube');
  const opts = {
    width: '550',
  };
  return (
    <Grid.Container gap={2}>
      <Grid sm={24} justify='center'>
        <Card onClick={goBack}>
          <ArrowLeftCircle />
        </Card>
      </Grid>
      {movie && (
        <>
          <Grid sm={10}>
            <Tile title={movie?.title} poster_path={movie?.poster_path} />
          </Grid>
          <Grid sm={14}>
            <Card shadow>
              <Card.Content style={{ width: 'auto' }}>
              <Text h1>Overview</Text>
                <Text         
                  style={{
                    textAlign: 'justify',
                    fontWeight: 700
                  }} 
                p>{movie?.overview}</Text>
              </Card.Content>
            </Card>
            <Spacer y={1} />
            {videos && videos?.length >= 1 && (
                <YouTube opts={opts} videoId={videos[0].key} />
              )
            }
          </Grid>
        </>
        )
      }
    </Grid.Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { pid: '1' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const instance = Fetcher.getInstance();

  try {
    const { data: movie } = (await instance.getAsync<Movie>({
      path: `/movie/${params.pid}`,
      params: 'append_to_response=videos'
    })) as AxiosResponse<Movie>;

    if(!movie) {
      return {
        props: {
          movie: null
        }
      }
    }

    return {
      props: {
        movie,
      }
    }
  } catch(err) {
    return {
      props: {
        movie: {}
      }
    }
  }
}

export default MoviePage