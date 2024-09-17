import { ErrorMessage } from "@hookform/error-message";
import { Container, FormHelperText, Paper, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useRedirect from "../../hooks/useRedirect";

export default function RegisterForm() {
  useRedirect("loggedIn");
  const [apiErrors, setApiErrors] = useState({});
  const navigate = useNavigate();
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
    for (const [field, messages] of Object.entries(apiErrors)) {
      const types = {};
      for (let i = 0; i < messages.length; i += 1) {
        types[`server_error_${i}`] = messages[i];
      }
      const fieldName = ["username", "password1", "password2"].includes(field)
        ? field
        : `root.${field}`; //
      setError(fieldName, {
        types,
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
      navigate("/login");
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
    <Paper elevation={3} sx={{ margin: 3, px: 4 }}>
      <Stack
        spacing={3}
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        py={3}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">Register a new account:</Typography>
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
              label="Confirm Password"
              variant="outlined"
              type="password"
            />
          )}
        />

        {errors.root && (
          <>
            {Object.entries(errors.root).map((errorArray) => (
              <ErrorMessage
                key={errorArray[0]}
                name={errorArray[0]}
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
          </>
        )}
        <Button
          variant="contained"
          sx={{ width: "fit-content", alignSelf: "center" }}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </Paper>
  );
}
