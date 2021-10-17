import type { NextPage } from 'next'

import { useState } from 'react'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core"

import serverApi from '../utils/server-api'
import { FindOptions, StockWithPosition } from '../utils/protocols'
import useDidMount from '../hooks/useDidMount'
import { TableWithPagination } from "../components"

type Options = {
  strategy?: string
  stocks: string
}


const RankMyStocks: NextPage = () => {
  const [ranking, setRanking] = useState<StockWithPosition[]>([])
  const [strategies, setStrategies] = useState<string[]>([])
  const [options, setOptions] = useState<Options>({
    strategy: "greenblatt",
    stocks: "ITSA, ARZZ",
  })

  async function getAndUpdateStrategies() {
    const result = await serverApi.strategies()
    setStrategies(result)
  }

  function handleChangeOptions(option: keyof Options, value: string | boolean) {
    setOptions({
      ...options,
      [option]: value
    })
  }

  function parseStockCodes(value: string) {
    const stocks = value.split(",")
      .filter(stock => stock)
      .map(stock => stock.trim())
    return stocks
  }

  async function updateRanking() {
    const findOptions: FindOptions = {
      strategy: options.strategy,
      stocks: parseStockCodes(options.stocks)
    }
    setRanking([])
    const result = await serverApi.find(findOptions)
    setRanking(result)
  }

  useDidMount(() => {
    getAndUpdateStrategies()
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Strategy</InputLabel>

              <Select
                value={options?.strategy}
                label="Strategy"
                onChange={({ target }) =>
                  handleChangeOptions(
                    "strategy",
                    target.value as string
                  )
                }
              >
                {strategies.map(strategy => (
                  <MenuItem value={strategy}>{strategy}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Stocks"
              variant="outlined"
              value={options.stocks}
              fullWidth
              onChange={({ target }) => handleChangeOptions("stocks", target.value)}
            />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={updateRanking}
            >
              Update Ranking
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TableWithPagination
          rows={ranking}
          head={(
            <TableHead>
              <TableRow>
                <TableCell>
                  Position
                </TableCell>

                <TableCell>
                  Stock Code
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          bodyRowFn={
            (stock: any) => (
              <TableRow>
                <TableCell>
                  {stock.position}
                </TableCell>

                <TableCell>
                  {stock.code}
                </TableCell>
              </TableRow>
            )
          }
        />
      </Grid>
    </Grid>
  )
}

export default RankMyStocks
