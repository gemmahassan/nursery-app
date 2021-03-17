import React, {useEffect, useState} from 'react';

import {
  IonContent,
  IonModal,
} from '@ionic/react';
import JournalTypeDataService from "../../../services/journal-type";
import JournalDataService from "../../../services/journal";
import NurseryDataService from "../../../services/nursery"
import {useParams} from "react-router-dom";
import {Button, Form, Input, Select} from "antd";

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
  const [image, setImage] = useState();

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

  const handleAddEntry = ({
                            type_id,
                            child_id,
                            text
                          }) => {
    const formData = new FormData();
    formData.append('type_id', type_id);
    formData.append('child_id', child_id);
    formData.append('image', image, image.name);
    formData.append('text', text);

    JournalDataService.create(formData, nurseryId)
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

  // const newEntry = () => {
  //   setEntry(initialEntryState);
  // };

  return (
    <IonContent>
      <IonModal isOpen={showAddModal}>
        <Form
          name="journal"
          initialValues={{remember: true}}
          onFinish={handleAddEntry}>
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

          <Form.Item
            label="Select Child"
            name="child"
            rules={[{required: true, message: 'Please select a child'}]}>
            <Select name="child_id">
              {children && children.map(child => (
                <Select.Option value={child.id}>{child.first_name} {child.surname}</Select.Option>
              ))}
            </Select>
          </Form.Item>

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
      </IonModal>
    </IonContent>
  );
};

export default AddEntry;