import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import MapMarkerPopup from "./MapMarkerPopup";

function EventMap() {
  const mapRef = useRef();
  const [mapBounds, setMapBounds] = useState([0, 180, -90, -180]);
  const [zoom, setZoom] = useState(10);
  const [points, setPoints] = useState([]);
  const [dateFilters, setDateFilters] = useState({
    starts_after: null,
    ends_after: null,
    starts_before: null,
    ends_before: null,
  });


  useEffect(() => {
    const fetchEvents = async () => {
      if (mapBounds.length) {
        try {
          // const { data } = await axiosReq.get(`/events/`);
          console.log(mapBounds);
          // let url = `/events/?min_lat=${mapBounds[1]}&max_lat=${mapBounds[3]}&min_long=${mapBounds[0]}&max_long=${mapBounds[2]}`;
          let url = `/events/?min_lat=-180&max_lat=180&min_long=-180&max_long=180`;
          for (const item in dateFilters) {
            if (dateFilters[item]) {
              url += `&${item}=${dateFilters[item].format("YYYY-MM-DD")}`;
            }
          }
          const { data } = await axiosReq.get(url);
          setPoints(
            data.results.map((event) => ({
              name: event.title,
              key: JSON.stringify({
                name: event.title,
                lat: event.lat,
                lng: event.lng,
              }),
              lat: parseFloat(event.lat),
              lng: parseFloat(event.long),
              event: {
                ...event,
              },
            }))
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchEvents();
  }, [mapBounds, dateFilters]);

  return (
    <APIProvider
      apiKey={
        process.env.REACT_APP_GMAPS_API_KEY
          ? process.env.REACT_APP_GMAPS_API_KEY
          : window.REACT_APP_GMAPS_API_KEY
      }
    >
      <Map
        mapId="bf51a910020fa25a"
        center={{ lat: 53.41291, lng: -8.24389 }}
        zoom={10}
        style={{height:"100vh"}}
      >
        <Markers points={points} />
      </Map>
    </APIProvider>
  );
}

function Markers({ points }) {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      }
      const newMarkers = { ...prev };
      delete newMarkers[key];
      return newMarkers;
    });
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <MapMarkerPopup {...point.event} />
        </AdvancedMarker>
      ))}
    </>
  );
}

export default EventMap;
