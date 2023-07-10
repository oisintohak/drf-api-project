import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { usePlacesWidget } from "react-google-autocomplete";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

const CreateEventForm = () => {
  const history = useHistory();
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
    const formData = new FormData();
    for (const [key, value] of Object.entries(eventData)) {
      formData.append(key, value);
    }
    try {
      const { data } = await axiosReq.post("/events/", formData);
      console.log(data);
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <main>
      <h1 className="text-center my-3">Create a new event:</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group className="my-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" ref={bootstrapRef} />
          </Form.Group>
          {errors?.address?.map((message, idx) =>
            idx === 0 ? (
              <div key={idx}>
                <Alert variant="warning">
                  Please select an address from the dropdown
                </Alert>
                <Alert variant="warning">{message}</Alert>
              </div>
            ) : (
              <div key={idx}>
                <Alert variant="warning">{message}</Alert>
              </div>
            )
          )}
          <Form.Group className="my-3">
            <Form.Label>Starts at:</Form.Label>
            <DateTimePicker
              className="d-block"
              onAccept={(e) => {
                if (e) {
                  setEventData({
                    ...eventData,
                    starts_at: e.format(),
                  });
                }
              }}
            />
          </Form.Group>
          {errors?.starts_at?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group className="my-3">
            <Form.Label>Ends at:</Form.Label>
            <DateTimePicker
              className="d-block"
              onAccept={(e) => {
                if (e) {
                  setEventData({
                    ...eventData,
                    ends_at: e.format(),
                  });
                }
              }}
            />
          </Form.Group>
          {errors?.ends_at?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button className="my-3" type="submit">
            Create Event
          </Button>
        </Form>
      </LocalizationProvider>
    </main>
  );
};

export default CreateEventForm;
