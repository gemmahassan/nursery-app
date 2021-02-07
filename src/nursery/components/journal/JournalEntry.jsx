import React from "react";
import moment from 'moment';

const JournalEntry = ({id, image, text, datetime, type}) => {
  const time = moment(datetime).format('h:mma');
  return (
    <>
      <h2>{`${time} - ${type}`}</h2>
      {image && (
        <img src={image} />
      )}
      <p>{text}</p>
    </>
  );
}

export default JournalEntry;