import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, List, Select} from "antd";
import {IonContent, IonModal} from "@ionic/react";
import ChildDataService from '../../../services/child';


const EditChild = ({child, showAddModal}) => {
  console.log(child);
  const initialChildState = {
    id: child.id,
    firstName: child.first_name,
    surname: child.surname,
    image: "",
  };
  const [currentChild, setCurrentChild] = useState(initialChildState);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);


  const handleUpdateChild = ({
                               first_name,
                               surname
                             }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    if (image) {
      formData.append('image', image, image.name);
    }

    ChildDataService.update(child.id, formData)
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
          name="child"
          initialValues={{first_name: currentChild.firstName, surname: currentChild.surname}}
          onFinish={handleUpdateChild}>
          Update Child Info
          <Form.Item
            label="First Name"
            name="first_name"
          >
            <Input
              placeholder={currentChild.firstName}
            />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
          >
            <Input
              placeholder={currentChild.surname}
            />
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

export default EditChild;