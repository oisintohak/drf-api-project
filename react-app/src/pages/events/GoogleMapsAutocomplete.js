import React from "react";
import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";

const GoogleMapsAutocomplete = (props) => {
  const {
    helperText,
    error,
    onChange,
    value,
    setValue,
    setEventData,
    setAddressSelected,
    trigger,
  } = props;

  const { ref: inputRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GMAPS_API_KEY,
    onPlaceSelected: (place) => {
      setAddressSelected(true);
      setValue("address", place.formatted_address); // set the address field value for react-hook-form
      trigger("address"); //trigger input validation
      setEventData((prevEventData) => ({
        ...prevEventData,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng(),
        address: place.formatted_address,
        place_id: place.place_id,
      }));
    },
    options: {
      types: ["geocode", "establishment"],
    },
  });

  return (
    <TextField
      helperText={helperText}
      error={error}
      onChange={onChange}
      value={value}
      fullWidth
      variant="outlined"
      label="address"
      inputRef={inputRef}
    />
  );
};
export default GoogleMapsAutocomplete;
