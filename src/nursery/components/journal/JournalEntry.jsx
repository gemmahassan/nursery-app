import React, {useState} from "react";
import moment from 'moment';
import {IonAlert, IonButton, IonContent, IonImg, IonModal} from '@ionic/react';
import EditEntry from "./EditEntry";
import JournalDataService from "../../../services/journal";

const JournalEntry = ({childId, journalId, image, staffId, text, timestamp, type, typeId}) => {
  const time = moment(timestamp).format('h:mma');

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const deleteEntry = () => {
    JournalDataService.delete(childId, journalId)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
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
          onClick={() => setShowDeleteAlert(true)}>
          delete
        </IonButton>
      </h2>

      {image &&
      <IonImg src={image}/>
      }
      <p>{text}</p>

      {showEditModal &&
      <EditEntry
        showEditModal={showEditModal}
        childId={childId}
        journalId={journalId}
        image={image}
        staff={staffId}
        text={text}
        timestamp={timestamp}
        type={type}
        typeId={typeId}
      />
      }

      {showDeleteAlert &&
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Confirm Deletion'}
        message={'Are you sure want to delete this journal entry?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Okay',
            handler: () => {
              deleteEntry();
            }
          }
        ]}
      />
      }
    </>
  );
}

export default JournalEntry;