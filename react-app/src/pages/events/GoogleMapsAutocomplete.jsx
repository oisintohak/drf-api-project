import React from "react";
import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";

function GoogleMapsAutocomplete(props) {
  const {
    helperText,
    error,
    onChange,
    value,
    setValue,
    setAddressData,
    setAddressSelected,
    trigger,
    size,
  } = props;

  // FIND A WAY TO ENSURE THE SCRIPT HAS LOADED FIRST:
  // const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  // useEffect(() => {
  //   if (window.google) console.log("google:", window.google);

  //   if (typeof google !== "undefined") {
  //     if (window.google.maps && window.google.maps.api)
  //       setGoogleScriptLoaded(true);
  //   }
  // }, [window.google]);

  const { ref: inputRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GMAPS_API_KEY
      ? process.env.REACT_APP_GMAPS_API_KEY
      : window.REACT_APP_GMAPS_API_KEY,
    onPlaceSelected: (place) => {
      setAddressSelected(true);
      setValue("address", place.formatted_address); // set the address field value for react-hook-form
      trigger("address"); // trigger input validation
      setAddressData((prevAddressData) => ({
        ...prevAddressData,
        lat: place.geometry.location.lat().toString().slice(0, 12),
        long: place.geometry.location.lng().toString().slice(0, 12),
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
      size={size}
    />
  );
}
export default GoogleMapsAutocomplete;
