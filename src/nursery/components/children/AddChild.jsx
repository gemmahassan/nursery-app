import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, List, Select} from "antd";
import {IonContent, IonModal} from "@ionic/react";
import ChildDataService from '../../../services/child';


const AddChild = ({nurseryId, showAddModal}) => {
  const [children, setChildren] = useState([]);
  const [image, setImage] = useState();
const [addSuccess, setAddSuccess] = useState(false);


  const handleAddChild = ({
                            first_name,
                            surname
                          }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    formData.append('image', image, image.name);
    formData.append('nursery_id', nurseryId);

    ChildDataService.create(formData, nurseryId)
      .then(response => {
        setAddSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <IonContent>
      <IonModal isOpen={showAddModal}>
        <Form
          name="child"
          initialValues={{remember: true}}
          onFinish={handleAddChild}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{required: true, message: 'Please add a first name'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[{required: true, message: 'Please add a surname'}]}
          >
            <Input/>
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

export default AddChild;