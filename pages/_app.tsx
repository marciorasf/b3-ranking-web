import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from "next/link"

import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core"

import { Spacing } from '../components'
import '../styles/globals.css'
import theme from "../styles/theme"

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>B3 Ranking</title>
        <meta name="description" content="B3 Ranking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h5">
                  B3 Ranking
                </Typography>
              </Grid>

              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <Link href="/" passHref >
                      <Button>
                        Home
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link href="/last-import" passHref >
                      <Button>
                        Last Import
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link href="/ranking" passHref >
                      <Button>
                        Ranking
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link href="/rank-my-stocks" passHref >
                      <Button>
                        Rank My Stocks
                      </Button>
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
    </ThemeProvider>
  )
}
export default App
