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
  const [loading, setLoading] = useState<boolean>(false)

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
    setLoading(true)

    setRanking([])
    const result = await serverApi.ranking(options)
    setRanking(result)

    setLoading(false)
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
              <InputLabel>Estratégia</InputLabel>

              <Select
                value={options?.strategy}
                label="Estratégia"
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
                label="Manter apenas um código por empresa"
              />
            </FormGroup>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={updateRanking}
            >
              Atualizar ranking
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
                  Rank
                </TableCell>

                <TableCell>
                  Código da ação
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
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default Ranking
