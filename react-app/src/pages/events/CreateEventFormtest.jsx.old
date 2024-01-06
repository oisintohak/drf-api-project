import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { axiosReq } from "../../api/axiosDefaults";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";

export default function CreateEventForm() {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, trigger } = useForm({
    defaultValues: {
      title: "",
      address: "",
      starts_at: "",
      ends_at: "",
      main_image: "",
    },
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
    console.log(submitData);
    for (const [key, value] of Object.entries({
      ...submitData,
      ...addressData,
    })) {
      console.log(key, value);
      if (key === "main_image") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }
    try {
      const { data } = await axiosReq.post("/events/", formData);
      navigate(`/events/${data.id}`);
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
                onChange={onChange}
                value={value}
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                fullWidth
                type="file"
                label="Main Image"
                variant="outlined"
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
