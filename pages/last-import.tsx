import type { NextPage } from 'next'
import Link from "next/link"

import { Link as MuiLink, Grid, Typography } from "@material-ui/core"
import { useState } from "react"

import serverApi from '../utils/server-api'
import { StockImport } from '../utils/protocols'
import useDidMount from '../hooks/useDidMount'

const LastImport: NextPage = () => {
  const [lastImport, setLastImport] = useState<StockImport>()

  async function getAndUpdateLastImport() {
    const result = await serverApi.lastImport()
    setLastImport(result)
  }

  useDidMount(() => {
    getAndUpdateLastImport()
  })

  return lastImport ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Link href="/" passHref>
          <MuiLink>
            Home
          </MuiLink>
        </Link>
      </Grid>

      <Grid item xs={12}>
        Date: {new Date(lastImport.date).toLocaleString("en-uk", { dateStyle: "short", hour12: false, timeStyle: "long" })}
      </Grid>

      <Grid item xs={12}>
        Errors: {lastImport.importErrors.length > 0 ? lastImport.importErrors : "None"}
      </Grid>

      <Grid item xs={12}>
        Stocks: {lastImport.stocks.map(stock => stock.code).join(", ")}
      </Grid>
    </Grid>
  ) : (
    <Typography variant="h4">
      Fetching data...
    </Typography>
  )
}

export default LastImport
