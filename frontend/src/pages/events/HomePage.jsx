import React, { useEffect, useRef, useState } from "react";
import EventList from "./EventList";

import { Box, Paper, Typography } from "@mui/material";
import SearchInput from "../../components/SearchInput";

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');

  return (
    <Paper elevation={3} sx={{ margin: 3 }}>
      <SearchInput date={date} query={query} setDate={setDate} setQuery={setQuery} />
      <Box sx={{ margin: 3, padding: 3 }}>
        <Typography variant="h3" sx={{ textAlign: "center", padding: 3 }}>
          {query || date ?
            "Search Results"
            : "Popular Events"
          }
        </Typography>
        <EventList date={date} query={query} />
      </Box>
    </Paper>
  );
};

export default HomePage;
