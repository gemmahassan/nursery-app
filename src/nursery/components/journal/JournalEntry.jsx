import React from "react";
import moment from 'moment';
import { IonImg } from '@ionic/react';

const JournalEntry = ({id, image, text, datetime, type}) => {
  const time = moment(datetime).format('h:mma');
  return (
    <>
      <h2>{`${time} - ${type}`}</h2>
      {image && (
        <IonImg src={image} />
      )}
      <p>{text}</p>
    </>
  );
}

export default JournalEntry;