import React, {useEffect, useState, useRef} from 'react';

import {IonContent} from '@ionic/react';
import JournalDataService from "../../../services/journal";import NurseryDataService from "../../../services/nursery";
import {useParams} from "react-router-dom";
import {Form, Input, Modal, Select} from "antd";

const AddEntry = props => {
  const {child, showAddModal, hideAddModal, userId} = props;
  const {nurseryId} = useParams();
  const formElement = useRef();

  const [journalTypes, setJournalTypes] = useState([]);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  const getJournalTypes = () => {
    JournalDataService.getTypes()
      .then(response => {
        setJournalTypes(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJournalTypes();
  }, []);

  const handleAddEntry = ({
                            entryType,
                            text
                          }) => {
    const formData = new FormData();
    formData.append('type_id', entryType);
    formData.append('child_id', child.id);
    formData.append('text', text);
    formData.append('user_id', userId);
    formData.append('nursery_id', child.nursery_id);
    if (image) {
      formData.append('image', image, image.name);
    }

    JournalDataService.create(formData, nurseryId)
      .then(response => {
        setAddSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <IonContent>
      <Modal
        visible={showAddModal}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        onCancel={() => hideAddModal()}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          ref={formElement}
          name="journal"
          initialValues={{remember: true}}
          onFinish={handleAddEntry}>
          Add a Journal entry for {child.first_name}
          <Form.Item
            label="Entry Type"
            name="entryType"
            rules={[{required: true, message: 'Please select the entry type'}]}
          >
            <Select name="type_id">
              {journalTypes && journalTypes.map(type => (
                <Select.Option value={type.id}>{type.type}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          {child.photo &&
          <Form.Item
            name="image"
            label="Add an image"
          >
            <input
              name="image" // name of input field or fieldName simply
              encType="multipart/form-data"
              type="file"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Form.Item>
          }X

          <Form.Item
            label="Description"
            name="text">
            <Input/>
          </Form.Item>

        </Form>
        {addSuccess && (
          <p>Added!</p>
        )}
      </Modal>
    </IonContent>
  );
};

export default AddEntry;