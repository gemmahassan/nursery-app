import React, {useEffect, useState} from 'react';

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import JournalDataService from "../../../services/journal";
import JournalTypeDataService from "../../../services/journal-type";
import NurseryDataService from "../../../services/nursery";

const EditEntry = ({childId, journalId, showEditModal, staffId, text, timestamp, type, typeId}) => {
  // const { nurseryId } = useParams();
  const initialEntryState = {
    id: journalId,
    child_id: childId,
    type_id: typeId,
    image: "",
    text: text,
    staff_id: staffId,
    timestamp: timestamp,
  };
  //
  console.log(journalId);

  const [journalTypes, setJournalTypes] = useState([]);
  const [children, setChildren] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(initialEntryState);
  //
  const handleInputChange = event => {
    const {name, value} = event.target;
    setCurrentEntry({...currentEntry, [name]: value});
    console.log(currentEntry);
  };

  const getJournalTypes = () => {
    JournalTypeDataService.getAll()
      .then(response => {
        setJournalTypes(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const getChildren = () => {
  //   NurseryDataService.getChildren(nurseryId)
  //     .then(response => {
  //       setChildren(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  useEffect(() => {
    getJournalTypes();
    // getChildren();
  }, []);

  const saveEntry = () => {
    let data = {
      type_id: currentEntry.type_id,
      child_id: currentEntry.child_id,
      image: currentEntry.image,
      text: currentEntry.text,
    };

    JournalDataService.edit(data, childId, journalId)
      .then(response => {
        setCurrentEntry({
          id: response.data.id,
          child_id: response.data.child_id,
          type_id: response.data.type_id,
          image: response.data.image,
          text: response.data.text,
          staff_id: response.data.staff_id,
          timestamp: response.data.timestamp,
        });
        console.log("response: ", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <IonContent>
      <IonModal isOpen={showEditModal}>
        <IonList>
          <IonItem>
            <IonLabel>Journal Entry Type</IonLabel>
            <IonSelect
              name="type_id"
              onIonChange={handleInputChange}
            >
              {journalTypes && journalTypes.map(type => (
                <IonSelectOption value={type.id}>{type.type}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonLabel>Description</IonLabel>
          <IonItem>
            <IonInput
              value={currentEntry.text}
              onIonChange={handleInputChange}
              name="text"
              clearInput
            >
            </IonInput>
          </IonItem>
        </IonList>
        <IonButton
          class="ion-float-right ion-padding"
          size="large"
          color="medium"
          onClick={saveEntry}>
          Update
        </IonButton>
      </IonModal>
    </IonContent>
  );
};

export default EditEntry;