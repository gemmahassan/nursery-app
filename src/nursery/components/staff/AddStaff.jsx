import React, {useState} from "react";
import {IonContent} from '@ionic/react';
import UserDataService from "../../../services/user";
import {Button, Form, Input, Modal} from "antd";
import http from "../../../shared/http-common";

const AddStaff = ({nurseryId, showAddModal}) => {
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  const handleAddStaff = ({
                            first_name,
                            surname,
                            email
                          }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('image', image, image.name);
    formData.append('nursery_id', nurseryId);
    formData.append('role', 'staff');

    UserDataService.create(formData)
      .then(response => {
        const token = response.data.token;
        const subject = 'Nursery Journal - You have been added as a staff member!';
        const message = `Hi ${first_name}, you have been added as a staff member.
                                  Please click on the link below to create a password and complete your registration
                                  http://localhost:8081/register?token=${token}`;
        http.post("/send", {
          first_name,
          email,
          subject,
          message
        }).then(() => {
          setAddSuccess(true);
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <IonContent>
      <Modal visible={showAddModal}>
        <Form
          name="child"
          initialValues={{remember: true}}
          onFinish={handleAddStaff}
        >
          Add a new staff member
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
            label="Email Address"
            name="email"
            rules={[{required: true, message: 'Please add an email address'}]}
          >
            <Input/>
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
      </Modal>
    </IonContent>
  );
};

export default AddStaff;
