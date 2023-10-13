import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
import dayjs from "dayjs";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Stack, Typography } from "@mui/material";
export default function EditEventForm(props) {
  const history = useHistory();
  const { id } = useParams();
  const { control, handleSubmit, setValue, trigger, getValues } = useForm({
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
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        const {
          title,
          address,
          ends_at,
          starts_at,
          is_creator,
          lat,
          long,
          place_id,
        } = data;
        if (is_creator) {
          setValue("title", title);
          setValue("address", address);
          setValue("ends_at", dayjs(ends_at));
          setValue("starts_at", dayjs(starts_at));
          setAddressSelected(true);
          setAddressData({ lat, long, address, place_id });
        } else {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [id, history, getValues, setValue]);

  const onSubmit = async (submitData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries({
      ...submitData,
      ...addressData,
    })) {
      if (key === "starts_at" || key === "ends_at") {
        formData.append(key, value.format());
      } else {
        formData.append(key, value);
      }
    }
    try {
      const { data } = await axiosReq.put(`/events/${id}/`, formData);
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
          <Typography variant="h3">Edit Event:</Typography>
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
            Create Event
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
