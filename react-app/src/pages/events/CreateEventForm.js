import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Typography } from "@mui/material";
export default function CreateEventForm() {
  const history = useHistory();
  const { control, handleSubmit, setValue, trigger } = useForm({
    defaultValues: { title: "", address: "", starts_at: "", ends_at: "" },
  });
  const [addressSelected, setAddressSelected] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [eventData, setEventData] = useState({
    lat: "",
    long: "",
    address: "",
    place_id: "",
  });
  const { address } = eventData;

  const onSubmit = async (submitData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries({
      ...submitData,
      ...eventData,
    })) {
      if (key === "starts_at" || key === "ends_at") {
        formData.append(key, value.format());
      } else {
        formData.append(key, value);
      }
    }
    try {
      const { data } = await axiosReq.post("/events/", formData);
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setApiErrors(err.response?.data);
        console.log(apiErrors);
      }
    }
  };

  return (
    <main>
      <h1>Create a new event:</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Please enter a title" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label="title"
                variant="outlined"
              />
            )}
          />
          <FormGroup>
            <label>
              Address (search for an address and select a valid address from the
              dropdown):
            </label>
            <Controller
              name="address"
              control={control}
              rules={{
                validate: () =>
                  addressSelected ||
                  "Please select a valid address from the dropdown",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <GoogleMapsAutocomplete
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  setValue={setValue}
                  trigger={trigger}
                  setEventData={setEventData}
                  setAddressSelected={setAddressSelected}
                />
              )}
            />
            <span>Selected Address: {address}</span>
          </FormGroup>
          <FormGroup>
            <Controller
              name="starts_at"
              control={control}
              rules={{
                required: "please enter a start date/time",
                validate: (value) =>
                  value > dayjs() || "please enter a date/time in the future",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  disablePast
                  label="Starts At"
                  slotProps={{
                    textField: {
                      helperText: error ? error.message : null,
                      error: !!error,
                    },
                  }}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="ends_at"
              control={control}
              rules={{
                required: "please enter an end date/time",
                validate: (value) =>
                  value > dayjs() || "please enter a date/time in the future",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  label="Ends at"
                  slotProps={{
                    textField: {
                      helperText: error ? error.message : null,
                      error: !!error,
                    },
                  }}
                />
              )}
            />
          </FormGroup>
          <Button type="submit">Create Event</Button>
        </Box>
        <Typography variant="body1" color="error">
          {apiErrors && <span>{apiErrors.address}</span>}
        </Typography>
      </LocalizationProvider>
    </main>
  );
}
