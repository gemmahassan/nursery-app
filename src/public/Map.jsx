import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from "./LocationPin";
// import './map.css'

const Map = ({zoomLevel}) => {

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCliTrjNK25GdtBIadSK75GdPhbHK4_kwI' }}
      defaultCenter={location}
      defaultZoom={17}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
      />
    </GoogleMapReact>
    );

};

export default Map;