import { ArrowLeftCircle } from '@zeit-ui/react-icons';
import { GetStaticProps, GetStaticPaths } from 'next'
import { Grid, Card, Text, Collapse } from '@zeit-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { AxiosResponse } from 'axios';

import Fetcher from 'fetcher';
import Loading from 'components/Loading'
import type { Show } from 'type/show';
import Tile from 'components/Tile';


function ShowPage({ show }: { show: Show }) {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);
  
  if(router.isFallback) {
    return <Loading />
  }

  return (
    <Grid.Container gap={2}>
      <Grid sm={24} justify='center'>
        <Card onClick={goBack}>
          <ArrowLeftCircle />
        </Card>
      </Grid>
      {show && (
        <>
          <Grid sm={10}>
            <Tile title={show?.name} poster_path={show?.poster_path} />
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
                p>{show?.overview}</Text>
              </Card.Content>
            </Card>
          </Grid>
          <Grid sm={24}>
            <Collapse shadow initialVisible={true} title="Seasons" >
              <Grid.Container gap={2}>
                {show?.seasons?.map(({ poster_path, name, id }) => (
                  <Grid key={id} sm={6}>
                    <Tile title={name} poster_path={poster_path} />
                  </Grid>
                ))}
              </Grid.Container>
            </Collapse>
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
    const { data: show } = (await instance.getAsync<Show>({
      path: `/tv/${params.pid}`,
    })) as AxiosResponse<Show>;

    if(!show) {
      return {
        props: {
          show: null
        }
      }
    }

    return {
      props: {
        show,
      }
    }
  } catch(err) {
    return {
      props: {
        show: null
      }
    }
  }
}

export default ShowPage