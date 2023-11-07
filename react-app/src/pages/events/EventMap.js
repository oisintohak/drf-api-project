import React, { useEffect, useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoogleMapReact from "google-map-react";
import { Button } from "@mui/material";
import useSupercluster from "use-supercluster";
import MapMarkerPopup from "./MapMarkerPopup";
import FilterMenu from "./FilterMenu";

const EventMap = () => {
  const mapRef = useRef();
  const [mapBounds, setMapBounds] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [points, setPoints] = useState([]);
  const [dateFilters, setDateFilters] = useState({
    starts_after: null,
    ends_after: null,
    starts_before: null,
    ends_before: null,
  });

  const Marker = ({ children }) => children;

  useEffect(() => {
    const fetchEvents = async () => {
      if (mapBounds.length) {
        try {
          // const { data } = await axiosReq.get(`/events/`);
          console.log(mapBounds);
          let url = `/events/?min_lat=${mapBounds[1]}&max_lat=${mapBounds[3]}&min_long=${mapBounds[0]}&max_long=${mapBounds[2]}`;
          for (let item in dateFilters) {
            if (dateFilters[item]) {
              url += `&${item}=${dateFilters[item].format("YYYY-MM-DD")}`;
            }
          }
          const { data } = await axiosReq.get(url);
          setPoints(
            data.results.map((event) => ({
              type: "Feature",
              properties: {
                cluster: false,
                ...event,
              },
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
  }, [mapBounds, dateFilters]);
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom,
    bounds: mapBounds,
    options: { radius: 10, maxZoom: 12 },
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ position: "fixed", marginTop: "10rem"}}>
        <FilterMenu dateFilters={dateFilters} setDateFilters={setDateFilters} />
      </div>
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
          // // set mapBounds to initial map bounds:
          // setMapBounds([
          //   bounds[3],
          //   bounds[2],
          //   bounds[0],
          //   bounds[1],
          // ])
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          console.log(`zoom:`, zoom);
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
                <Button
                  variant="contained"
                  className="cluster-marker"
                  sx={{
                    padding: 0,
                    margin: 0,
                    width: `${60 + (pointCount / points.length) * 35}px`,
                    height: `${60 + (pointCount / points.length) * 35}px`,
                    borderRadius: "100%",
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
                </Button>
              </Marker>
            );
          }

          return (
            <Marker
              key={`event-${cluster.properties.id}`}
              lat={latitude}
              lng={longitude}
            >
              <MapMarkerPopup {...cluster.properties} />
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default EventMap;
