import type { AppProps } from 'next/app'
import Head from 'next/head'

import { CssBaseline, Container } from "@material-ui/core"

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>B3 Magical Formula</title>
        <meta name="description" content="B3 Magical Formula" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
export default App
