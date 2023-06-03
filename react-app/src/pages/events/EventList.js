import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "../../components/Event";

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
      <>
        {events.results?.length ? (
          <>
            {events.results.map((event) => (
              <Event {...event} />
            ))}
          </>
        ) : (
          <>no events</>
        )}
      </>
    </div>
  );
};

export default EventList;
