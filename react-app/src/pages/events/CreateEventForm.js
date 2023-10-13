import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Stack, Typography } from "@mui/material";
export default function CreateEventForm() {
  const history = useHistory();
  const { control, handleSubmit, setValue, trigger } = useForm({
    defaultValues: { title: "", address: "", starts_at: "", ends_at: "" },
  });
  const [addressSelected, setAddressSelected] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [addressData, setAddressData] = useState({
    lat: "",
    long: "",
    address: "",
    place_id: "",
  });
  const { address } = addressData;

  const onSubmit = async (submitData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries({
      ...submitData,
      ...addressData,
    })) {
      if (key === "starts_at" || key === "ends_at") {
        console.log(key, value.format())
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
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          spacing={3}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          py={3}
        >
          <Typography variant="h3">Create a new event:</Typography>
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
                  helperText={
                    error
                      ? error.message
                      : "Please search for an address and select a valid address from the dropdown"
                  }
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  setValue={setValue}
                  trigger={trigger}
                  setAddressData={setAddressData}
                  setAddressSelected={setAddressSelected}
                />
              )}
            />
            <Typography variant="caption">
              Selected Address: {address}
            </Typography>
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
                  disablePast
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
          <Button
            variant="contained"
            sx={{ width: "fit-content", alignSelf: "center" }}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
        {apiErrors.address && (
          <Typography variant="body1" color="error">
            {apiErrors.address}
          </Typography>
        )}
      </LocalizationProvider>
    </Container>
  );
}
