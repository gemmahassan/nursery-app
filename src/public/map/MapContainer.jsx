import React from "react";
import Map from "./Map";

const MapContainer = ({ nurseries }) => {
  // default location passed to child component, this is where the map is centred
  const location = {
    lat: 54.6418,
    lng: -6.7444,
    text: "",
  };

  // map all locations from the nursery array into a new location array
  const getNurseryLocations = () => {
    const nurseryLocations = [];
    nurseries.map((nursery) => {
      nurseryLocations.push({
        latitude: nursery.latitude,
        longitude: nursery.longitude,
        text: nursery.name,
      });
    });

    return nurseryLocations;
  };

  return <Map getNurseryLocations={getNurseryLocations} location={location} />;
};

export default MapContainer;
