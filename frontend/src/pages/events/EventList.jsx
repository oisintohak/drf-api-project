import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "../../components/Event";
import EventSkeleton from "./EventSkeleton";

const EventList = (props) => {
  const {
    query,
    date,
  } = props;
  const [events, setEvents] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false)
    console.log(`query:${query}`)
    const fetchEvents = async () => {
      console.log('fetching events')
      try {
        const { data } = await axiosReq.get(`/events/?search=${query}&date=${date}`);
        setEvents(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setTimeout(() => fetchEvents(), 1000)
    return () => {
      console.log('clearing timeout')
      clearTimeout(timer);
    };
  }, [query, date]);

  return loaded ? (
    <Grid container spacing={3} p={3}>
      {events.results.map((event) => (
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center" }}
          xs={12}
          md={6}
          xl={4}
          key={event.id}
        >
          <Event {...event} eventlist />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container justifyContent="center" spacing={3} p={3}>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        md={6}
        xl={4}
      >
        <EventSkeleton />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        md={6}
        xl={4}
      >
        <EventSkeleton />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        md={6}
        xl={4}
      >
        <EventSkeleton />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        md={6}
        xl={4}
      >
        <EventSkeleton />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        md={6}
        xl={4}
      >
        <EventSkeleton />
      </Grid>
    </Grid>
  );
}

export default EventList;
