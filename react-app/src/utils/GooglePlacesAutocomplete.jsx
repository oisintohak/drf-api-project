// adapted from https://mui.com/material-ui/react-autocomplete/#google-maps-place
// and https://stackoverflow.com/a/68787096
// and https://www.woosmap.com/en/blog/implement-and-optimise-google-place-autocomplete-with-places-library

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY
    ? process.env.REACT_APP_GMAPS_API_KEY
    : window.REACT_APP_GMAPS_API_KEY,
});

// const autocompleteService = { current: null };
// const placesService = { current: null };

export default function GooglePlacesAutocomplete(props) {
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
  const placesRef = useRef(null);
  const placesService = useRef(null);
  const sessionToken = useRef(null);
  const autocompleteService = useRef(null);

  const onPlaceSelected = (place) => {
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
  };

  const [selectedValue, setSelectedValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  // const loaded = React.useRef(false);
  useEffect(() => {
    loader.load().then(async () => {
      await window.google.maps.importLibrary("places");
    });
  }, []);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    if (
      !placesService.current &&
      window.google.maps.places &&
      placesRef.current
    ) {
      placesService.current = new window.google.maps.places.PlacesService(
        placesRef.current
      );
    }
    if (!placesService.current) {
      return undefined;
    }
    if (!selectedValue?.place_id) {
      return undefined;
    }
    placesService.current.getDetails(
      {
        placeId: selectedValue.place_id,
        sessionToken: sessionToken.current,
        fields: ["geometry.location", "formatted_address", "place_id"],
      },
      onPlaceSelected
    );
    sessionToken.current = null;
    console.log("selectedValue", selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    // console.log("selectedValue", selectedValue);
    // console.log("inputvalue", inputValue);
    if (!sessionToken.current && window.google.maps.places) {
      sessionToken.current =
        new window.google.maps.places.AutocompleteSessionToken();

      console.log(
        `%c new session token ${sessionToken.current}`,
        "color:green; font-size:20px;"
      );
    }
    let active = true;
    if (!autocompleteService.current && window.google.maps.places) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(selectedValue ? [selectedValue] : []);
      return undefined;
    }

    fetch(
      { input: inputValue, sessionToken: sessionToken.current },
      (results) => {
        console.log(results);
        if (active) {
          let newOptions = [];

          if (selectedValue) {
            newOptions = [selectedValue];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [selectedValue, inputValue, fetch]);

  return (
    <>
      <Autocomplete
        id="google-map-demo"
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={selectedValue}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setSelectedValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            helperText={helperText}
            error={error}
            {...params}
            label="Add a location"
            fullWidth
          />
        )}
        renderOption={(optionProps, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      <div ref={placesRef} />
      {selectedValue && (
        <div>
          {Object.keys(selectedValue).map((key) => (
            <span key={key}>{key}</span>
          ))}
        </div>
      )}
    </>
  );
}
