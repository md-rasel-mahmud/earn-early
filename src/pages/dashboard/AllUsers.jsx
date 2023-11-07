import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MOCK_DATA from "../../assets/data/MOCK_DATA.json";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import { useMemo } from "react";
import { COLUMNS } from "../../helper/column";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import GlobalSearch from "../../components/utils/GlobalSearch";

const AllUsers = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = tableInstance;

  return (
    <>
      <GlobalSearch setFilter={setGlobalFilter} filter={globalFilter} />
      <TableContainer component={Paper}>
        <Table {...getTableProps}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{ background: grey[300] }}
                    key={index}
                    sortDirection={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "desc"
                          : "asc"
                        : false
                    }
                  >
                    <Stack gap={1} alignItems="center" direction="row">
                      {column.render("Header")}{" "}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownward fontSize="1rem" />
                        ) : (
                          <ArrowUpward fontSize="1rem" />
                        )
                      ) : (
                        ""
                      )}
                    </Stack>
                    <Box>{column.canFilter && column.render("Filter")} </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps} key={index}>
                  {row.cells.map((cell, i) => (
                    <TableCell {...cell.getCellProps()} key={i}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AllUsers;
