import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { CssBaseline } from '@zeit-ui/react';
import flush from 'styled-jsx/server';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
          {flush()}
        </>
      ),
    };
  }
  render() {
    return (
      <Html>
        <Head />
        <Main />
        <NextScript />
      </Html>
    );
  }
}
export default Document;
