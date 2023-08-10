import { useForm, Controller } from "react-hook-form";
import React, { useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
export default function CreateEventForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    trigger,
  } = useForm({
    defaultValues: { title: "", address: "", starts_at: "", ends_at: "" },
  });
  const [addressSelected, setAddressSelected] = useState(false);

  const [eventData, setEventData] = useState({
    title: "",
    starts_at: "",
    ends_at: "",
    lat: "",
    long: "",
    address: "",
    place_id: "",
  });
  const { address } = eventData;
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
    console.log(touchedFields);
  };

  return (
    <main>
      <h1>Create a new event:</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Plase enter a title" }}
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
                validate: () => {
                  if (addressSelected) {
                    return true;
                  } else {
                    return "Please select a valid address from the dropdown";
                  }
                },
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
              label="Starts at"
              control={control}
              rules={{ required: "Plase enter a start date" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
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
              label="Ends at"
              control={control}
              rules={{ required: "Plase enter an end date" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
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
      </LocalizationProvider>
    </main>
  );
}
