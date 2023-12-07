import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Container, Skeleton } from "@mui/material";
import Event from "../../components/Event";
import { axiosReq } from "../../api/axiosDefaults";
import EventSkeleton from "./EventSkeleton";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        setEvent(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [id]);
  return (
    <Container sx={{p:3}}>
      {loaded ? <Event {...event} isDetail /> : <EventSkeleton />}
    </Container>
  );
}

export default EventDetail;
