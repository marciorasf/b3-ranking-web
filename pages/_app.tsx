import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from "next/link"

import { CssBaseline, Container, AppBar, Toolbar, Typography, Grid, Link as MuiLink } from "@material-ui/core"

import { Spacing } from '../components'
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

      <AppBar position="static" color="secondary">
        <Container>
          <Toolbar disableGutters>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h5">
                  B3 Ranking
                </Typography>
              </Grid>

              <Grid item>
                <Grid container spacing={4}>
                  <Grid item>
                    <Link href="/" passHref >
                      <MuiLink>
                        Home
                      </MuiLink>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link href="/last-import" passHref >
                      <MuiLink>
                        Last Import
                      </MuiLink>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link href="/ranking" passHref >
                      <MuiLink>
                        Ranking
                      </MuiLink>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link href="/rank-my-stocks" passHref >
                      <MuiLink>
                        Rank My Stocks
                      </MuiLink>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      <Spacing orientation="horizontal" size={4} />

      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
export default App
