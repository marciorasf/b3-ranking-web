import type { NextPage } from 'next'
import Link from "next/link"

import { useState } from 'react'
import { Link as MuiLink, Grid, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"

import serverApi from '../utils/server-api'
import { StockWithPosition } from '../utils/protocols'
import useDidMount from '../hooks/useDidMount'

const Ranking: NextPage = () => {
  const [ranking, setRanking] = useState<StockWithPosition[]>([])

  async function getAndUpdateRanking() {
    const result = await serverApi.ranking()
    setRanking(result)
  }

  useDidMount(() => {
    getAndUpdateRanking()
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Link href="/" passHref >
          <MuiLink>
            Home
          </MuiLink>
        </Link>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Position
              </TableCell>

              <TableCell>
                Stock
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ranking.map(stock => (
              <TableRow>
                <TableCell>
                  {stock.position}
                </TableCell>

                <TableCell>
                  {stock.code}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default Ranking
