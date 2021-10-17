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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core"

import serverApi from '../utils/server-api'
import { RankingOptions, StockWithPosition } from '../utils/protocols'
import useDidMount from '../hooks/useDidMount'

type PaginationOptions = {
  page: number
  rowsPerPage: number
}

const Ranking: NextPage = () => {
  const [ranking, setRanking] = useState<StockWithPosition[]>([])
  const [strategies, setStrategies] = useState<string[]>([])
  const [options, setOptions] = useState<RankingOptions>({
    strategy: "greenblatt",
    filterSameEnterpriseStocks: true
  })
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    page: 0,
    rowsPerPage: 25
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

  function handleChangePaginationOptions(option: keyof PaginationOptions, value: number) {
    setPaginationOptions({
      ...paginationOptions,
      [option]: value
    })
  }

  function rowsToDisplay(page: number, rowsPerPage: number) {
    return [page * rowsPerPage, page * rowsPerPage + rowsPerPage]
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
        <TableContainer>
          <Table size="small">
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

            <TableBody>
              {ranking
                .slice(...rowsToDisplay(paginationOptions.page, paginationOptions.rowsPerPage))
                .map(stock => (
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={2}
                  count={ranking.length}
                  rowsPerPage={paginationOptions.rowsPerPage}
                  page={paginationOptions.page}
                  onPageChange={(_event, page) => { handleChangePaginationOptions("page", page) }}
                  onRowsPerPageChange={({ target }) => {
                    handleChangePaginationOptions("rowsPerPage", parseInt(target.value))
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Ranking
