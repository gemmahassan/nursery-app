import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from "./LocationPin";

const Map = ({nurseries}) => {
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
  }

  return (
    <>
      <h1>Find Our Nurseries</h1>
      <div style={{ height: '600px', width: '100%', margin: '0 0 75px 0', border: '15px solid pink' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyCliTrjNK25GdtBIadSK75GdPhbHK4_kwI'}}
          defaultCenter={location}
          defaultZoom={8}
        >
          {getNurseryLocations().map(nurseryLocation => {
            return (
              <LocationPin
                lat={nurseryLocation.latitude}
                lng={nurseryLocation.longitude}
                text={nurseryLocation.text}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;