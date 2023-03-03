import "./App.css";
import { axiosReq, axiosRes } from "./api/axiosDefaults";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState(null);

  const fetchEvents = async () => {
    try {
      const { data } = await axiosRes.get("events");
      console.log(data);
      setEvents(data);
      console.log(events);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return <div>
    {events && 
      <>
      {events[0].title}
      {events[0]['starts_at']}
      </>
    }
  </div>;
}

export default App;
