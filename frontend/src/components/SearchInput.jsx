import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import FilterMenu from "../pages/events/FilterMenu";
import Divider from '@mui/material/Divider';

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const SearchInput = (props) => {
  const {
    query,
    setQuery,
    date,
    setDate,
  } = props;
  const [dateFilters, setDateFilters] = useState({
    starts_after: null,
    ends_after: null,
    starts_before: null,
    ends_before: null,
  });

  return (
    <Stack
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="row"
      padding={2}
    // sx={{
    //   width: 200,
    // }}
    >
      {/* <Autocomplete
        freeSolo
        options={[]}
        renderInput={(params) => (
          <TextField
            fullWidth
            size="small"
            label="Find an event"
            {...params}
            InputProps={{
              ...params.InputProps,
              style: {
                color: "white",
                border: "1px solid white",
              },
              //   size: "small",
            }}
          />
        )}
      /> */}
      <TextField color="primary" size="small" label="Find an event" value={query} onChange={event => setQuery(event.target.value)} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <MobileDatePicker
          value={date}
          onChange={value => setDate(value.format('YYYY-MM-DD'))}
          slotProps={{
            textField: {
              size: "small"

            },
          }}
        // sx={{width: 3}}
        />
      </LocalizationProvider>

    </Stack>
  );
};

export default SearchInput;
