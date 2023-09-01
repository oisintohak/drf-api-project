import React, { useEffect, useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoogleMapReact from "google-map-react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import useSupercluster from "use-supercluster";
import PlaceIcon from "@mui/icons-material/Place";

const EventMap = () => {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef();
  const [mapBounds, setMapBounds] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [points, setPoints] = useState([]);

  const Marker = ({ children }) => children;

  useEffect(() => {
    const fetchEvents = async () => {
      if (mapBounds.length) {
        try {
          // const { data } = await axiosReq.get(`/events/`);
          console.log(mapBounds)
          const { data } = await axiosReq.get(
            `/events/?min_lat=${mapBounds[1]}&max_lat=${mapBounds[3]}&min_long=${mapBounds[0]}&max_long=${mapBounds[2]}`
          );
          setLoaded(true);
          setPoints(
            data.results.map((event) => ({
              type: "Feature",
              properties: { cluster: false, id: event.id, title: event.title },
              geometry: {
                type: "Point",
                coordinates: [parseFloat(event.long), parseFloat(event.lat)],
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
  }, [mapBounds]);
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom,
    bounds: mapBounds,
    options: { radius: 25, maxZoom: 20 },
  });

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GMAPS_API_KEY
            ? process.env.REACT_APP_GMAPS_API_KEY
            : window.REACT_APP_GMAPS_API_KEY,
        }}
        defaultCenter={{ lat: 53.41291, lng: -8.24389 }}
        defaultZoom={8}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          // console.log(map.getBounds().toJSON())
          // let bounds = map.getBounds().toJSON()
          // setMapBounds([
          //   bounds[3],
          //   bounds[2],
          //   bounds[0],
          //   bounds[1],
          // ])

        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          console.log(`zoom:`, zoom)
          setMapBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                    borderRadius: "100%",
                    padding: "20px",
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </Box>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.id}`}
              lat={latitude}
              lng={longitude}
            >
              <IconButton size="large" sx={{ color: "red" }}>
                <PlaceIcon size="large" />
              </IconButton>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default EventMap;
