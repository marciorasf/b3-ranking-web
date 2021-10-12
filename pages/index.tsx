import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { CssBaseline, Container, List, ListItem, Link as MuiLink } from "@material-ui/core"

const Home: NextPage = () => {
  function ItemLink(href: string, label: string) {
    return (
      <Link href={href} passHref >
        <MuiLink>
          <ListItem disableGutters>
            {label}
          </ListItem>
        </MuiLink>
      </Link>
    )
  }

  return (
    <Container>
      <CssBaseline />
      <Head>
        <title>B3 Magical Formula</title>
        <meta name="description" content="B3 Magical Formula" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <List>
        {ItemLink("last-import", "Last Import")}
        {ItemLink("ranking", "Ranking")}
        {ItemLink("find", "Find")}
      </List>
    </Container>
  )
}

export default Home
