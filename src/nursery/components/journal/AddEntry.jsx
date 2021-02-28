import React, {useEffect, useState} from 'react';

import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption, IonButton, IonModal,
} from '@ionic/react';
import JournalTypeDataService from "../../../services/journal-type";
import JournalDataService from "../../../services/journal";
import NurseryDataService from "../../../services/nursery"
import {useParams} from "react-router-dom";

const AddEntry = ({childId, showAddModal}) => {
  const {nurseryId} = useParams();
  const initialEntryState = {
    id: null,
    child_id: null,
    type_id: null,
    image: "",
    text: "",
    staff_id: null,
    timestamp: "",
  };

  const [journalTypes, setJournalTypes] = useState([]);
  const [children, setChildren] = useState([]);
  const [entry, setEntry] = useState(initialEntryState);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setEntry({...entry, [name]: value});
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

  const getChildren = () => {
    NurseryDataService.getChildren(nurseryId)
      .then(response => {
        setChildren(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJournalTypes();
    getChildren();
  }, []);

  const saveEntry = () => {
    let data = {
      type_id: entry.type_id,
      child_id: entry.child_id,
      image: entry.image,
      text: entry.text,
    };

    JournalDataService.create(data, nurseryId)
      .then(response => {
        setEntry({
          id: response.data.id,
          child_id: response.data.child_id,
          type_id: response.data.type_id,
          image: response.data.image,
          text: response.data.text,
          staff_id: response.data.staff_id,
          timestamp: response.data.timestamp,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEntry = () => {
    setEntry(initialEntryState);
  };

  return (

    <IonContent>
      <IonModal isOpen={showAddModal}>
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

          <IonItem>
            <IonLabel>Select Child</IonLabel>
            <IonSelect
              name="child_id"
              onIonChange={handleInputChange}
            >
              {children && children.map(child => (
                <IonSelectOption value={child.id}>{child.first_name} {child.surname}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonLabel>Image Upload</IonLabel>
          <IonItem>
            <IonInput
              value={entry.image}
              onIonChange={handleInputChange}
              name="image"
              clearInput
            >
            </IonInput>
          </IonItem>

          <IonLabel>Description</IonLabel>
          <IonItem>
            <IonInput
              value={entry.text}
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
          Submit
        </IonButton>
      </IonModal>
    </IonContent>
  );
};

export default AddEntry;