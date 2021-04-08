import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from "./LocationPin";
// import './map.css'

const Map = ({nurseries}) => {
  const location = {
    lat: 54.6079,
    lng: -5.9264,
    address: '1 street',
  };

  // const location = {
  //   address: '1600 Amphitheatre Parkway, Mountain View, california.',
  //   lat: 37.42216,
  //   lng: -122.08427,
  // }

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
          defaultZoom={9}
        >
          {/*<LocationPin*/}
          {/*  lat={location.lat}*/}
          {/*  lng={location.lng}*/}
          {/*  text={location.address}*/}
          {/*/>*/}
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