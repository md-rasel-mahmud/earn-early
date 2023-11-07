import { PropTypes } from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Stack, TextField } from "@mui/material";

const GlobalSearch = ({ filter, setFilter }) => {
  return (
    <Stack
      bgcolor="lightgray"
      direction="row"
      py={1}
      position="sticky"
      borderRadius={2}
      top={60}
      my={2}
      boxShadow={3}
      zIndex={999}
    >
      <TextField
        label="Search"
        placeholder="Search…"
        value={filter || ""}
        sx={{ margin: 1 }}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

// define propTypes
GlobalSearch.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

export default GlobalSearch;
