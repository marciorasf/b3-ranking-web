import React, { useState, ReactElement } from "react"

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core"
import { Spacing } from "."

type TableWithPagination = {
  head: ReactElement
  rows: any[]
  bodyRowFn: (row: any) => ReactElement
  colSpan: number
  loading?: boolean
}

type PaginationOptions = {
  page: number
  rowsPerPage: number
}

const TableWithPagination: React.FC<TableWithPagination> = ({
  head,
  rows,
  bodyRowFn,
  colSpan,
  loading
}) => {
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    page: 0,
    rowsPerPage: 10
  })

  function handleChangePaginationOptions(option: keyof PaginationOptions, value: number) {
    setPaginationOptions({
      ...paginationOptions,
      [option]: value
    })
  }

  function rowsToDisplay(page: number, rowsPerPage: number) {
    return [page * rowsPerPage, page * rowsPerPage + rowsPerPage]
  }

  return (
    <TableContainer >
      <Table size="small">
        {head}
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={colSpan} >
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
                >
                  Loading data
                  <Spacing orientation="vertical" size={2} />
                  <CircularProgress size={14} color="secondary" />
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.length
              ? rows
                .slice(...rowsToDisplay(paginationOptions.page, paginationOptions.rowsPerPage))
                .map(bodyRowFn)
              : (
                <TableRow>
                  <TableCell colSpan={colSpan} >
                    <Typography
                      variant="body1"
                      color="secondary"
                      style={{ fontWeight: "bold" }}
                    >
                      There is no row to display
                    </Typography>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={colSpan}
              count={rows.length}
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
    </TableContainer >
  )
}

export default TableWithPagination
