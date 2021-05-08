import React from 'react'
import {HeartFilled} from "@ant-design/icons";

const LocationPin = ({ text }) => (
  <div className={'pin'}>
    <HeartFilled className={'pin-icon'}>{text}</HeartFilled>
  </div>
);

export default LocationPin;