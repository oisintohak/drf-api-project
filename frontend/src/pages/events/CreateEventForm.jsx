import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Container, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { MuiFileInput } from "mui-file-input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

export default function CreateEventForm() {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      address: "",
      starts_at: "",
      ends_at: "",
      main_image: "",
    },
  });
  const [apiErrors, setApiErrors] = useState({});
  const [addressData, setAddressData] = useState({
    lat: "",
    long: "",
    address: "",
    place_id: "",
  });
  const { lat, long, address, place_id } = addressData;

  const onSubmit = async (submitData) => {
    const formData = new FormData();
    Object.entries({
      ...submitData,
      ...addressData,
    }).map(([key, value]) => {
      if (key === "starts_at" || key === "ends_at") {
        console.log(key, value.format());
        return formData.append(key, value.format());
      }
      if (key === "main_image" && !value) {
        return null;
      }
      return formData.append(key, value);
    });
    try {
      const { data } = await axiosReq.post("/events/", formData);
      navigate(`/events/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setApiErrors(err.response?.data);
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
          <FormGroup>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Please enter a title" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label="Title"
                  variant="outlined"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="main_image"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MuiFileInput
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  type="file"
                  label="Main Image"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <AttachFileIcon />,
                  }}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="address"
              control={control}
              rules={{
                validate: () =>
                  (!!address && !!lat && !!long && !!place_id) ||
                  "Please select a valid address from the dropdown",
              }}
              render={({ fieldState: { error } }) => (
                /* value and onchange are not passed to this component, as it handles its own values internally
                and updates the addressData state variable. 
                validation is done by checking the addressData state variable. */
                <GooglePlacesAutocomplete
                  helperText={
                    error
                      ? error.message
                      : "Please search for an address and select a valid address from the dropdown"
                  }
                  size="small"
                  error={!!error}
                  setValue={setValue}
                  setAddressData={setAddressData}
                  addressData={addressData}
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
                      size: "small",
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
                      size: "small",
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
