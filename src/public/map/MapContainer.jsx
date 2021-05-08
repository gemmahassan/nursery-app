import React from 'react'
import Map from "./Map";

const MapContainer = ({nurseries}) => {
  const location = {
    lat: 54.6418,
    lng: -6.7444,
    address: '1 street',
  };

  const getNurseryLocations = () => {
    const nurseryLocations = []
    nurseries.map(nursery => {
      nurseryLocations.push({
        latitude: nursery.latitude,
        longitude: nursery.longitude,
        text: nursery.name,
      });
    });

    return nurseryLocations;
  };

  return (
    <Map
      getNurseryLocations={getNurseryLocations}
      location={location}
    />
  );
};

export default MapContainer;