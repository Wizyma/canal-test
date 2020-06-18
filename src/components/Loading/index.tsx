import { Grid, Loading as LoadingZeit, Card } from '@zeit-ui/react';

export default function Loading({ sm }: { sm?: number }) {
  return (
    <Grid sm={sm ?? 21} justify="center">
      <Card>
        <LoadingZeit size="large" />
      </Card>
    </Grid>
  );
}
