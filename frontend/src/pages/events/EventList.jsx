import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "../../components/Event";
import EventSkeleton from "./EventSkeleton";

const EventList = (props) => {
  const {
    query,
    date,
    filter,
  } = props;
  const [events, setEvents] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false)
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/?search=${query ? query : ''}&date=${date ? date : ''}${filter ? filter : ''}`);
        setEvents(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setTimeout(() => fetchEvents(), 1000)
    return () => {
      clearTimeout(timer);
    };
  }, [query, date, filter]);

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
          <Event {...event} setEvents={setEvents} eventlist />
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
