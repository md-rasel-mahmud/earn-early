import ColumnFilter from "../components/utils/ColumnFilter";

export const COLUMNS = [
  {
    Header: "#",
    Footer: "#",
    accessor: "id",

    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: (row) => `${row.firstName} ${row.lastName}`,
    Filter: ColumnFilter,
  },

  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
    Filter: ColumnFilter,
  },
  {
    Header: "Gender",
    Footer: "Gender",
    accessor: "gender",
    Filter: ColumnFilter,
  },
  {
    Header: "Occupation",
    accessor: "occupation",
    Filter: ColumnFilter,
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
    Filter: ColumnFilter,
  },
];
