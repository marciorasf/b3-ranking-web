import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core"
import {
  Close as CloseIcon,
  Menu as MenuIcon
} from "@material-ui/icons"

import { Spacing } from '../components'
import '../styles/globals.css'
import theme from "../styles/theme"
import logoImg from "../assets/images/logo.png"
import useIsMobile from '../hooks/useIsMobile'

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "100%",
  },
  brandButton: {
    padding: theme.spacing(1, 4),
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: theme.spacing(1),
  },
}))

function App({ Component, pageProps }: AppProps) {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const isMobile = useIsMobile(theme)
  const classes = useStyles()

  function handleOpenSidebar() {
    setOpenSidebar(true)
  }

  function handleCloseSidebar() {
    setOpenSidebar(false)
  }

  function menuItems(isMobile: boolean) {
    const item = (href: string, label: string) => {
      const props = {
        fullWidth: isMobile,
        onClick: isMobile ? handleCloseSidebar : () => { }
      }
      return (
        <Grid item>
          <Link href={href} passHref >
            <Button {...props}>
              {label}
            </Button>
          </Link>
        </Grid>
      )
    }

    return (
      <>
        {item("/", "Home")}
        {item("/last-import", "Last Import")}
        {item("/ranking", "Ranking")}
        {item("/rank-my-stocks", "Rank My Stocks")}
      </>
    )
  }

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
                <Link href="/" passHref>
                  <Button fullWidth>
                    <Image src={logoImg} alt="logo" height={32} width={32} />
                    <Spacing orientation="vertical" size={2} />
                    <Typography variant="h5">
                      B3 Ranking
                    </Typography>
                  </Button>
                </Link>
              </Grid>

              <Grid item>
                {isMobile
                  ? (
                    <IconButton onClick={handleOpenSidebar}>
                      <MenuIcon />
                    </IconButton>
                  )
                  : (
                    <Grid container spacing={1}>
                      {menuItems(false)}
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Toolbar>
        </Container>

        <Drawer
          open={openSidebar && isMobile}
          onClose={handleCloseSidebar}
          anchor="right"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton className={classes.closeButton} onClick={handleCloseSidebar}>
              <CloseIcon />
            </IconButton>

            <Box>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Link href="/" passHref >
                    <Button
                      fullWidth
                      className={classes.brandButton}
                    >
                      <Image src={logoImg} alt="logo" height={32} width={32} />
                      <Spacing orientation="vertical" size={2} />
                      <Typography variant="h6">B3 Ranking</Typography>
                    </Button>
                  </Link>
                </Grid>

                {menuItems(true)}
              </Grid>
            </Box>
          </Box>
        </Drawer>
      </AppBar>

      <Spacing orientation="horizontal" size={4} />

      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider >
  )
}
export default App
