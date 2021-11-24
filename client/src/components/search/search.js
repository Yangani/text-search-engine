import "./search.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

// Enter the search term: <user enters search term>
// Search Method: 1) String Match 2) Regular Expression 3) Indexed

const Search = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState("");
  const [searchMethod, setSearchMethod] = useState(null);
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchText.length === 0) return;

    // make api call to do string
    const searchParams = {
      searchText: searchText.toLowerCase(),
      searchMethod: searchMethod,
    };

    getSearchResults(searchParams);
  };

  const getSearchResults = (searchParams) => {
    setIsLoading(true);

    axios
      .get("/search", { params: searchParams })
      .then((res) => {
        setSearchResults([...res.data]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    searchMethod ? setSearchDisabled(false) : setSearchDisabled(true);
  }, [searchMethod]);

  const handleSearchMethodChange = (event) => {
    setSearchMethod(event.target.value);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={3} className="search">
      <div>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel>String Match</InputLabel>
            <Select
              value={searchMethod}
              label="Search Method"
              onChange={handleSearchMethodChange}
            >
              <MenuItem value={1}>Simple search</MenuItem>
              <MenuItem value={2}>Regex search</MenuItem>
              <MenuItem value={3}>Indexed search</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div>
        {searchDisabled ? (
          <TextField
            disabled
            label="Search text"
            type="search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <TextField
            label="Search text"
            type="search"
            onChange={updateSearchText}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {isLoading ? (
                    <LoadingButton loading />
                  ) : (
                    <IconButton
                      aria-label="search"
                      onClick={handleSearchSubmit}
                    >
                      <SearchIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>
    </Stack>
  );
};

export default Search;
