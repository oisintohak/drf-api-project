import { useForm, Controller } from "react-hook-form";
import React, { Fragment, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
export default function LoginForm() {
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });
  const [apiErrors, setApiErrors] = useState({});

  const onSubmit = async (submitData) => {
    const formData = new FormData();

    formData.append("username", submitData.username);
    formData.append("password", submitData.password);
    try {
      const { data } = await axios.post("auth/login/", formData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setError("root.serverError", {
        type: err.response?.status,
        message: err.response?.data,
      });
      setApiErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Stack
        spacing={3}
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        py={3}
      >
        <Typography variant="h6">Log in to your account:</Typography>
        <Controller
          name="username"
          control={control}
          rules={{ required: "Please enter your username" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label="username"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Please enter your password" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label="password"
              variant="outlined"
              type="password"
            />
          )}
        />
        {errors.root?.serverError && (
          <Fragment>
            {Object.entries(errors.root.serverError.message).map(
              ([key, value]) => (
                <Alert key={key} severity="error">
                  {value}
                </Alert>
              )
            )}
          </Fragment>
        )}
        <Button
          variant="contained"
          sx={{ width: "fit-content", alignSelf: "center" }}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
