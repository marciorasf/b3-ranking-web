import React, { useState, ReactElement } from "react"

import {
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@material-ui/core"

type TableWithPagination = {
  head: ReactElement
  rows: any[]
  bodyRowFn: (row: any) => ReactElement
  paginationColSpan: number
}

type PaginationOptions = {
  page: number
  rowsPerPage: number
}

const TableWithPagination: React.FC<TableWithPagination> = ({
  head,
  rows,
  bodyRowFn,
  paginationColSpan
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
          {rows
            .slice(...rowsToDisplay(paginationOptions.page, paginationOptions.rowsPerPage))
            .map(bodyRowFn)
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={paginationColSpan}
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
