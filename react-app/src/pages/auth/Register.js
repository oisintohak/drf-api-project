import { ErrorMessage } from "@hookform/error-message";
import {
  Container,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

export default function RegisterForm() {
  useRedirect("loggedIn");
  const [apiErrors, setApiErrors] = useState({});
  const history = useHistory();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password1: "", password2: "" },
    criteriaMode: "all",
  });
  useEffect(() => {
    for (let [field, messages] of Object.entries(apiErrors)) {
      let types = {};
      for (let i = 0; i < messages.length; i++) {
        types[`server_error_${i}`] = messages[i];
      }
      let fieldName = ["username", "password1", "password2"].includes(field)
        ? field
        : `root.${field}`; //
      setError(fieldName, {
        types: types,
      });
    }
  }, [apiErrors, setError]);
  const onSubmit = async (submitData) => {
    const formData = new FormData();
    formData.append("username", submitData.username);
    formData.append("password1", submitData.password1);
    formData.append("password2", submitData.password2);
    try {
      await axios.post("auth/registration/", formData);
      history.push("/login");
    } catch (err) {
      if (err.response?.status !== 400) {
        setApiErrors({
          [`server_error_${err.response.status}`]: [
            `Server Error: ${err.response.statusText}. Please try again.`,
          ],
        });
      } else {
        setApiErrors(err.response?.data);
      }
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
        <Typography variant="h6">Register a new account:</Typography>
        <Controller
          name="username"
          control={control}
          rules={{ required: "Please enter your username" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              FormHelperTextProps={{ component: "div" }}
              helperText={
                error ? (
                  <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ messages }) => {
                      if (messages) {
                        return Object.entries(messages).map(
                          ([type, message]) => <p key={type}>{message}</p>
                        );
                      }
                      return null;
                    }}
                  />
                ) : null
              }
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
          name="password1"
          control={control}
          rules={{
            required: "Please enter a password",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              FormHelperTextProps={{ component: "div" }}
              helperText={
                error ? (
                  <ErrorMessage
                    errors={errors}
                    name="password1"
                    render={({ messages }) => {
                      if (messages) {
                        return Object.entries(messages).map(
                          ([type, message]) => <p key={type}>{message}</p>
                        );
                      }
                      return null;
                    }}
                  />
                ) : null
              }
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
            />
          )}
        />
        <Controller
          name="password2"
          control={control}
          rules={{ required: "Please confirm your password" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              FormHelperTextProps={{ component: "div" }}
              helperText={
                error ? (
                  <ErrorMessage
                    errors={errors}
                    name="password2"
                    render={({ messages }) => {
                      if (messages) {
                        return Object.entries(messages).map(
                          ([type, message]) => <p key={type}>{message}</p>
                        );
                      }
                      return null;
                    }}
                  />
                ) : null
              }
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
            />
          )}
        />

        {errors.root && (
          <Fragment>
            {Object.entries(errors.root).map(([key, value]) => (
              <ErrorMessage
                key={key}
                name={key}
                errors={errors.root}
                render={({ messages }) => {
                  if (messages) {
                    return Object.entries(messages).map(([type, message]) => (
                      <FormHelperText error key={type}>
                        {message}
                      </FormHelperText>
                    ));
                  }
                  return null;
                }}
              />
            ))}
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
