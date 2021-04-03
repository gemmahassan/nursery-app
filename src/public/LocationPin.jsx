import React from 'react'
import GoogleMapReact from 'google-map-react'
// import './map.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <p className="pin-text">{text}</p>
  </div>
)

export default LocationPin;