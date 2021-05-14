import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

const Map = ({ getNurseryLocations, location }) => {
  return (
    <>
      <h1>Find Our Nurseries</h1>
      <div
        style={{
          height: "600px",
          width: "100%",
          margin: "0 0 75px 0",
          border: "15px solid #ce72e8",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCliTrjNK25GdtBIadSK75GdPhbHK4_kwI" }}
          defaultCenter={location}
          defaultZoom={8}
        >
          {/*call the getNurseryLocations function and map over the locations, displaying each on the map*/}
          {getNurseryLocations().map((nurseryLocation) => {
            return (
              <LocationPin
                lat={nurseryLocation.latitude}
                lng={nurseryLocation.longitude}
                text={nurseryLocation.text}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
