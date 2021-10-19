import type { NextPage } from 'next'

import {
  Box,
  Container,
  Grid,
  IconButton,
  Popover,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import { Visibility as ShowIndicatorsIcon } from "@material-ui/icons"
import { useState } from "react"

import serverApi from '../utils/server-api'
import { Stock, StockImport } from '../utils/protocols'
import useDidMount from '../hooks/useDidMount'
import { Spacing, TableWithPagination } from '../components'

const LastImport: NextPage = () => {
  const [lastImport, setLastImport] = useState<StockImport>()
  const [popoverData, setPopoverData] = useState<{
    element: Element,
    stock: Stock
  } | null>(null)

  async function getAndUpdateLastImport() {
    const result = await serverApi.lastImport()
    setLastImport(result)
  }

  function handleOpenPopover(target: Element, stock: Stock) {
    setPopoverData({
      element: target,
      stock: stock
    })
  }

  function handleClosePopover() {
    setPopoverData(null)
  }

  useDidMount(() => {
    getAndUpdateLastImport()
  })

  return lastImport ? (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              Date:
            </Typography>

            <Spacing orientation="vertical" size={1} />

            <Typography variant="body1">
              {new Date(lastImport.date).toLocaleString("en-uk", { dateStyle: "short", hour12: false, timeStyle: "long" })}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              Errors:
            </Typography>

            <Spacing orientation="vertical" size={1} />

            <Typography variant="body1">
              {lastImport.importErrors.length > 0 ? lastImport.importErrors : "None"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            Stocks:
          </Typography>

          <Spacing orientation="horizontal" size={1} />

          <TableWithPagination
            head={(

              <TableHead>
                <TableRow>
                  <TableCell>
                    Stock Code
                  </TableCell>

                  <TableCell>
                    Current Price*
                  </TableCell>

                  <TableCell>
                    Indicators
                  </TableCell>
                </TableRow>
              </TableHead>
            )}
            rows={lastImport.stocks}
            bodyRowFn={(stock: Stock) => (
              <TableRow key={stock.code}>
                <TableCell>
                  {stock.code}
                </TableCell>

                <TableCell>
                  {stock.indicatorsValues.preco_atual
                    ? `R$ ${stock.indicatorsValues.preco_atual}`
                    : "-"
                  }
                </TableCell>

                <TableCell>
                  <IconButton onClick={(event) => handleOpenPopover(event.currentTarget, stock)}>
                    <ShowIndicatorsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
            colSpan={3}
          />
        </Grid>

        <Grid item xs={12}>
          Current Price* = price of the stock when the data was extracted.
        </Grid>
      </Grid>

      <Popover
        open={Boolean(popoverData)}
        anchorEl={popoverData?.element}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        {popoverData?.stock && (
          <Container >
            <Spacing orientation="horizontal" size={1} />

            <Grid container spacing={0}>
              {Object.entries(popoverData?.stock.indicatorsValues)
                .filter(([indicator]) => indicator !== "_id")
                .map(([indicator, value]) => (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {indicator}: {value}
                    </Typography>
                  </Grid>
                )
                )}
            </Grid>

            <Spacing orientation="horizontal" size={1} />
          </Container>
        )}
      </Popover>
    </>
  ) : (
    <Typography variant="h6">
      Loading data...
    </Typography>
  )
}

export default LastImport
