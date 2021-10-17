import type { AppProps } from 'next/app'
import Head from 'next/head'

import { CssBaseline, Container } from "@material-ui/core"

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>B3 Ranking</title>
        <meta name="description" content="B3 Ranking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
export default App
