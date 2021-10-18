import type { NextPage } from 'next'

import { useState } from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"

import serverApi from '../utils/server-api'
import { RankingOptions, StockWithPosition } from '../utils/protocols'
import useDidMount from '../hooks/useDidMount'
import { TableWithPagination } from '../components'


const Ranking: NextPage = () => {
  const [ranking, setRanking] = useState<StockWithPosition[]>([])
  const [strategies, setStrategies] = useState<string[]>([])
  const [options, setOptions] = useState<RankingOptions>({
    strategy: "greenblatt",
    filterSameEnterpriseStocks: true
  })

  async function getAndUpdateStrategies() {
    const result = await serverApi.strategies()
    setStrategies(result)
  }

  function handleChangeOptions(option: keyof RankingOptions, value: string | boolean) {
    setOptions({
      ...options,
      [option]: value
    })
  }

  async function updateRanking() {
    setRanking([])
    const result = await serverApi.ranking(options)
    setRanking(result)
  }

  useDidMount(() => {
    getAndUpdateStrategies()
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item >
            <FormControl variant="outlined">
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

          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options?.filterSameEnterpriseStocks}
                    onChange={({ target }) => handleChangeOptions(
                      "filterSameEnterpriseStocks", target.checked
                    )}
                  />}
                label="Filter same enterprise stocks"
              />
            </FormGroup>
          </Grid>

          <Grid item>
            <Button
              color="primary"
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
            (stock: StockWithPosition) => (
              <TableRow key={stock.code}>
                <TableCell>
                  {stock.position}
                </TableCell>

                <TableCell>
                  {stock.code}
                </TableCell>
              </TableRow>
            )
          }
          colSpan={2}
        />
      </Grid>
    </Grid>
  )
}

export default Ranking
