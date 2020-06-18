import { Page, Text } from '@zeit-ui/react';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  if (pageProps.statusCode === 404) {
    return <Component {...pageProps} />;
  }

  return (
    <Page>
      <Page.Header>
        <Text h1>Canal +</Text>
      </Page.Header>
      <Page.Content>
        <Component {...pageProps} />
      </Page.Content>
    </Page>
  );
}

export default App;
