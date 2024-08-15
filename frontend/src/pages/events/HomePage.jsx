import React, { useEffect, useRef, useState } from "react";
import EventList from "./EventList";

import { Box, Typography } from "@mui/material";
import SearchInput from "../../components/SearchInput";

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');

  return (
    <>
      <SearchInput date={date} query={query} setDate={setDate} setQuery={setQuery} />
      <Box sx={{ border: "1px solid black", margin: 3, padding: 3 }}>
        <Typography variant="h3" sx={{ textAlign: "center", padding: 3 }}>
          {query || date ?
              "Search Results"
             :"Popular Events"
          }
        </Typography>
        <EventList date={date} query={query} />
      </Box>
    </>
  );
};

export default HomePage;
