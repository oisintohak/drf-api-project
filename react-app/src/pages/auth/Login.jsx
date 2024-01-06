import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Container, FormHelperText, Stack, Typography } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import useRedirect from "../../hooks/useRedirect";

export default function LoginForm() {
  useRedirect("loggedIn");
  const [apiErrors, setApiErrors] = useState({});
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    criteriaMode: "all",
  });

  useEffect(() => {
    for (const [field, messages] of Object.entries(apiErrors)) {
      const types = {};
      for (let i = 0; i < messages.length; i+=1) {
        types[`server_error_${i}`] = messages[i];
      }
      const fieldName = ["username", "password"].includes(field)
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
    formData.append("password", submitData.password);
    try {
      const { data } = await axios.post("auth/login/", formData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate(-1);
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
        <Typography variant="h6">Log in to your account:</Typography>
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
          name="password"
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
                    name="password"
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
    </Container>
  );
}
