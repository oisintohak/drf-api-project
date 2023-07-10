import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "../../components/Event";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
            <Row>
              {events.results.map((event) => (
                <Col className="my-3" md={6} xl={4} key={event.id}>
                  <Event {...event} eventlist />
                </Col>
              ))}
            </Row>
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
