import React, { useEffect, useState } from "react";
import Event from "../../components/Event";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}`);
        setEvent(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [id]);
  return (
    <div>{loaded ? <Event {...event}></Event> : <span>loading...</span>}</div>
  );
};

export default EventDetail;
