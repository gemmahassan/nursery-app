import React, {useEffect, useState} from 'react';

import {
  IonContent,
  IonModal,
} from '@ionic/react';
import JournalTypeDataService from "../../../services/journal-type";
import JournalDataService from "../../../services/journal";
import {useParams} from "react-router-dom";
import {Button, Form, Input, Select} from "antd";

const AddEntry = ({child, showAddModal, userId}) => {
  const {nurseryId} = useParams();

  const [journalTypes, setJournalTypes] = useState([]);
  const [children, setChildren] = useState([]);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

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
    if (image) {
      formData.append('image', image, image.name);
    }

    JournalDataService.create(formData, nurseryId)
      .then(response => {
        setAddSuccess(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <IonContent>
      <IonModal isOpen={showAddModal}>
        <Form
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

          {/*<Form.Item*/}
          {/*  label="Select Child"*/}
          {/*  name="child"*/}
          {/*  rules={[{required: true, message: 'Please select a child'}]}>*/}
          {/*  <Select name="child_id">*/}
          {/*    {children && children.map(child => (*/}
          {/*      <Select.Option value={child.id}>{child.first_name} {child.surname}</Select.Option>*/}
          {/*    ))}*/}
          {/*  </Select>*/}
          {/*</Form.Item>*/}

          <Form.Item
            name="image"
            label="Add an image"
          >
            <input
              name="image" // name of input field or fieldName simply
              enctype="multipart/form-data"
              type="file"
              onChange={(event) => {
                // setState method with event.target.files[0] as argument
                setImage(event.target.files[0]);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="text">
            <Input/>
          </Form.Item>

          <Form.Item>
            <Button
              class="ion-float-right ion-padding"
              size="large"
              color="medium"
              type="primary"
              htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {addSuccess && (
          <p>Added!</p>
        )}
      </IonModal>
    </IonContent>
  );
};

export default AddEntry;