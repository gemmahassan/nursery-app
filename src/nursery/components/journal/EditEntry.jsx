import React, {useEffect, useState} from 'react';

import {
  IonAlert,
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
import {Button, Form, Input, Select} from "antd";

const EditEntry = ({childId, journalId, showEditModal, userId, text, timestamp, type, typeId}) => {
    const initialEntryState = {
      id: journalId,
      child_id: childId,
      type_id: typeId,
      image: "",
      text: text,
      user_id: userId,
      timestamp: timestamp,
    };

    const [journalTypes, setJournalTypes] = useState([]);
    const [children, setChildren] = useState([]);
    const [currentEntry, setCurrentEntry] = useState(initialEntryState);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [image, setImage] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const getJournalTypes = () => {
      JournalTypeDataService.getAll()
        .then(response => {
          setJournalTypes(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const deleteEntry = () => {
      JournalDataService.delete(childId, journalId)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    useEffect(() => {
      getJournalTypes();
      // getChildren();
    }, []);

    const handleEditEntry = ({
                               type_id,
                               text,
                             }) => {
      const formData = new FormData();
      formData.append('type_id', type_id);
      formData.append('text', text);
      formData.append('child_id', childId);
      formData.append('user_id', userId);
      if (image) {
        formData.append('image', image, image.name);
      }

      JournalDataService.edit(formData, childId, journalId)
        .then(response => {
          setUpdateSuccess(true);
        })
        .catch(e => {
          console.log(e);
        });
    };

    return (
      <IonContent>
        <IonModal isOpen={showEditModal}>
          <Form
            name="editEntry"
            initialValues={{type_id: currentEntry.type_id, text: currentEntry.text}}
            onFinish={handleEditEntry}
          >
            Update Journal entry
            <Form.Item
              label="Entry Type"
              name="type_id"
            >
              <Select name="type_id">
                {journalTypes && journalTypes.map(type => (
                  <Select.Option value={type.id}>{type.type}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="image"
              label="Add an image"
            >
              <input
                name="image" // name of input field or fieldName simply
                encType="multipart/form-data"
                type="file"
                onChange={(event) => {
                  // setState method with event.target.files[0] as argument
                  setImage(event.target.files[0]);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="text"
            >
              <Input
                placeholder={currentEntry.text}
              />
            </Form.Item>

            <Form.Item>
              <Button
                class="ion-float-right ion-padding"
                size="large"
                color="medium"
                type="primary"
                htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
          {updateSuccess && (
            <p>Updated!</p>
          )}

          <Button
            class="ion-float-right ion-padding"
            size="large"
            color="danger"
            onClick={() => setShowDeleteAlert(true)}>
            delete
          </Button>

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
                text: 'Yes',
                handler: () => {
                  deleteEntry();
                }
              }
            ]}
          />
          }
        </IonModal>
      </IonContent>
    );
  }
;

export default EditEntry;