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
import useOnUpdate from "../../hooks/useOnUpdate";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GMAPS_API_KEY
    ? import.meta.env.VITE_GMAPS_API_KEY
    : window.REACT_APP_GMAPS_API_KEY,
});

export default function GooglePlacesAutocomplete(props) {
  const {
    helperText,
    error,
    setValue,
    setAddressData,
    addressData,
    size,
    initialValue,
  } = props;
  const { address } = addressData;

  const placesServiceDomRef = useRef(null);
  const placesService = useRef(null);
  const sessionToken = useRef(null);
  const autocompleteService = useRef(null);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [initialValueLoaded, setInitialValueLoaded] = React.useState(false);

  useEffect(() => {
    /*
    initialValue is the previous address value when editing an event
    initialValue is only set once, when the API data loads
    the initialValueLoaded variable is used to prevent the selectedValue being set to null, 
    which throws an error about the component switching from controlled to uncontrolled
    */
    if (initialValue && !initialValueLoaded) {
      setInitialValueLoaded(true);
      setSelectedValue(initialValue);
    }
  }, [initialValue, setInputValue]);

  useOnUpdate(() => {
    /*
    this effect won't run on the initial render when the address is an empty string
    */
    setValue("address", address, { shouldValidate: true }); // set the address field value for react-hook-form
  }, [addressData]);

  const onPlaceSelected = (place) => {
    setAddressData({
      lat: place.geometry.location.lat().toString().slice(0, 12),
      long: place.geometry.location.lng().toString().slice(0, 12),
      address: place.formatted_address,
      place_id: place.place_id,
    });
  };

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
    /*
    This effect will execute when the selectedValue is updated. 
    It will create an instance of PlacesService if required. 
    Then it will make a request to get the place details and remove the session token
    */
    if (
      !placesService.current &&
      window.google.maps.places &&
      placesServiceDomRef.current
    ) {
      placesService.current = new window.google.maps.places.PlacesService(
        placesServiceDomRef.current
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
    return undefined;
  }, [selectedValue]);

  useEffect(() => {
    /*
    This effect is executed when the selectedValue or inputValue are updated.
    It creates new instances of AutocompleteSessionToken and AutocompleteService if required.
    Then it makes a new request to get Place predictions using the debounce fetch function
    */
    if (!sessionToken.current && window.google.maps.places) {
      sessionToken.current =
        new window.google.maps.places.AutocompleteSessionToken();
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
        id="google-places-autocomplete"
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
            {...params}
            helperText={helperText}
            error={error}
            size={size}
            label="Add a location"
          />
        )}
        renderOption={(optionProps, option) => {
          const matches =
            option.structured_formatting?.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting?.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );
          return (
            <li {...optionProps} key={`${optionProps.key}_${optionProps.id}`}>
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
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting?.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      {/*  needs a DOM ref to display attributions: */}
      <div ref={placesServiceDomRef} />
    </>
  );
}
