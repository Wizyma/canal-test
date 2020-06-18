import { Grid, Card, Image, Text } from '@zeit-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function Home() {
  const router = useRouter();
  const moviesRoute = useCallback(() => {
    router.push('/movies');
  }, [router]);
  const showsRoute = useCallback(() => {
    router.push('/shows');
  }, [router]);

  return (
    <Grid.Container gap={1} justify="center">
      <Grid>
        <Card shadow onClick={moviesRoute} width="400px">
          <Image
            height={200}
            width={400}
            style={{ objectFit: 'cover' }}
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"
          />
          <Text style={{ marginBottom: '0' }}>Movies</Text>
        </Card>
      </Grid>
      <Grid>
        <Card shadow width="400px" onClick={showsRoute}>
          <Image
            height={200}
            width={400}
            style={{ objectFit: 'cover' }}
            src="https://images.unsplash.com/photo-1558886668-e9a014c0141a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"
          />
          <Text style={{ marginBottom: '0' }}>TV Show</Text>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
