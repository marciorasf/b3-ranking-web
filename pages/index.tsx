import type { NextPage } from 'next'
import Link from "next/link"

import { List, ListItem, Link as MuiLink } from "@material-ui/core"

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
    <List>
      {ItemLink("last-import", "Last Import")}
      {ItemLink("ranking", "Ranking")}
      {ItemLink("find", "Find")}
    </List>
  )
}

export default Home
