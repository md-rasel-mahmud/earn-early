import { TextField } from "@mui/material";
import { PropTypes } from "prop-types";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <TextField
      placeholder="Filter"
      size="small"
      sx={{ marginTop: 3 }}
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

// define propTypes
ColumnFilter.propTypes = {
  column: PropTypes.object,
};

export default ColumnFilter;
