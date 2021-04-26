import React, {useEffect, useRef, useState} from 'react';

import {IonContent,} from '@ionic/react';
import JournalDataService from "../../../services/journal";
import {Button, Form, Input, Modal, Select} from "antd";

const EditEntry = ({child, hideEditModal, journalId, showEditModal, userId, text, timestamp, type, typeId}) => {
  console.log("child: ", child);
  const formElement = useRef();

    const initialEntry = {
      id: journalId,
      child_id: child.id,
      type_id: typeId,
      image: "",
      text: text,
      user_id: userId,
      timestamp: timestamp,
    };

    const [journalTypes, setJournalTypes] = useState([]);
    const [image, setImage] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

  const currentEntry = initialEntry;
  const photoPermission = child.photo;

    const getJournalTypes = () => {
      JournalDataService.getTypes()
        .then(response => {
          setJournalTypes(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const handleDelete = () => {
      JournalDataService.delete(journalId)
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
      formData.append('child_id', child.id);
      formData.append('user_id', userId);
      if (image) {
        formData.append('image', image, image.name);
      }

      JournalDataService.edit(formData, journalId)
        .then(response => {
          setUpdateSuccess(true);
        })
        .catch(e => {
          console.log(e);
        });
    };

    return (
      <IonContent>
        <Modal
          visible={showEditModal}
          onOK={() => {
            formElement.current && formElement.current.submit();
          }}
          onCancel={() => hideEditModal()}
          footer={[
            <Button
              key="cancel"
              onClick={() => hideEditModal()}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              onClick={() => {
                formElement.current && formElement.current.submit();
              }}>
              Save
            </Button>,
            <Button
              key="delete"
              type="danger"
              onClick={() => handleDelete()}
            >
              DELETE
            </Button>
          ]}
        >
          <Form
            ref={formElement}
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

            {photoPermission &&
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
            }

            <Form.Item
              label="Description"
              name="text"
            >
              <Input
                placeholder={currentEntry.text}
              />
            </Form.Item>

          </Form>
          {updateSuccess &&
          <p>Updated!</p>
          }

          {deleteSuccess &&
          <p>Deleted</p>
          }
        </Modal>
      </IonContent>
    );
  }
;

export default EditEntry;