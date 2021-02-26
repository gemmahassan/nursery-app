import React, {useState} from "react";
import moment from 'moment';
import {IonButton, IonContent, IonImg, IonModal} from '@ionic/react';
import history from "../../../history";
import EditEntry from "./EditEntry";

const JournalEntry = ({childId, journalId, image, staff, text, timestamp, type, typeId}) => {
  const time = moment(timestamp).format('h:mma');

  const [showEditModal, setShowEditModal] = useState(false);

  console.log(journalId);
  return (
    <>
      <h2>
        {`${time} - ${type}`}
        <IonButton
          color="light"
          onClick={() => setShowEditModal(true)}>
          edit
        </IonButton>
        <IonButton
          color="danger"
          onClick={() => history.push(`/child/${childId}/journal/${journalId}/delete`)}>
          delete
        </IonButton>
      </h2>

      {image &&
      <IonImg src={image}/>
      }
      <p>{text}</p>

      {showEditModal &&
      // <IonContent>
      //   <IonModal>
      //     isOpen={showEditModal}
      //   </IonModal>
      // </IonContent>
      <EditEntry
        showEditModal={showEditModal}
        childId={childId}
        journalId={journalId}
        image={image}
        staff={staff}
        text={text}
        timestamp={timestamp}
        type={type}
        typeId={typeId}
      />
      }
    </>
  );
}

export default JournalEntry;