import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { usePlacesWidget } from "react-google-autocomplete";
import { axiosReq } from "../../api/axiosDefaults";

const CreateEventForm = () => {
  const [errors, setErrors] = useState({});

  const [eventData, setEventData] = useState({
    title: "",
    starts_at: "",
    ends_at: "",
    lat: "",
    long: "",
    address: "",
    place_id: "",
  });

  const { title, starts_at, ends_at, lat, long, address, place_id } = eventData;

  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GMAPS_API_KEY,
    onPlaceSelected: (place) => {
      setEventData({
        ...eventData,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng(),
        address: place.formatted_address,
        place_id: place.place_id,
      });
    },
    options: {
      types: ["geocode", "establishment"],
    },
  });

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    const formData = new FormData();

    for (const [key, value] of Object.entries(eventData)) {
      formData.append(key, value);
    }
    try {
      const { data } = await axiosReq.post("/events/", formData);
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              console.log(e);
            }}
            ref={bootstrapRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Starts at:</Form.Label>
          <DateTimePicker
            defaultValue={dayjs()}
            onAccept={(e) => {
              setEventData({
                ...eventData,
                starts_at: e.format(),
              });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ends at:</Form.Label>
          <DateTimePicker
            defaultValue={dayjs()}
            onAccept={(e) => {
              setEventData({
                ...eventData,
                ends_at: e.format(),
              });
            }}
          />
        </Form.Group>
        <Button type="submit">Create Event</Button>
      </Form>
    </LocalizationProvider>
  );
};

export default CreateEventForm;
