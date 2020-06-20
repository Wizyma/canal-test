import { ArrowLeftCircle } from '@zeit-ui/react-icons';
import { Grid, Card, Row, Spacer } from '@zeit-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

export default function ShowsPage({ children }: { children?: React.ReactNode | React.ReactNodeArray }) {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Card>
    <Card.Content style={{ width: 'auto' }}>
      <Grid.Container gap={1}>
        <Row>
          <ArrowLeftCircle 
            // @ts-ignore
            onClick={goBack} />
        </Row>
        {children && React.Children.map(children, (child) => (
          <>
            <Row style={{ margin: 0 }}>
              <Spacer x={1} />
              {child}
            </Row>
          </>
        ))}
      </Grid.Container>
    </Card.Content>
  </Card>
  );
}
