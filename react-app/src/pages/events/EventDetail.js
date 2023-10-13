import React, { useEffect, useState } from "react";
import Event from "../../components/Event";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Box, Container, Skeleton } from "@mui/material";
import EventSkeleton from "./EventSkeleton";

const EventDetail = () => {
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
    <Container>
      {loaded ? <Event {...event} showEdit={event.is_creator} isDetail></Event> : <EventSkeleton />}
    </Container>
  );
};

export default EventDetail;
