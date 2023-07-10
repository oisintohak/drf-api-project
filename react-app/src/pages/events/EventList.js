import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "../../components/Event";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get("/events/");
        setEvents(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {loaded ? (
        <>
          {events.results?.length ? (
            <>
              {events.results.map((event) => (
                <Event {...event} eventlist />
              ))}
            </>
          ) : (
            <>no events</>
          )}
        </>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};

export default EventList;
