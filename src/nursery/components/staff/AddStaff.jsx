import React, {useState} from "react";
import {IonContent, IonInput, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import StaffDataService from "../../../services/staff";
import UserDataService from "../../../services/user";
import {Button, Form, Input} from "antd";

const AddStaff = ({nurseryId, showAddModal}) => {
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);
  const [newStaff, setNewStaff] = useState({});
  const [userId, setUserId] = useState(0);

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

    StaffDataService.create(formData, nurseryId)
      .then(response => {
        formData.append('role', 'staff');
        formData.append('staff_id', response.data.id);
        const staffId = response.data.id;
        UserDataService.create({
          email,
          role: 'staff'
        })
          .then(response => {
            StaffDataService.update({
              'userId': response.data.id,
              staffId
            })
              .then(response => {
                setAddSuccess(true);
              })
              .catch(e => {
                console.log(e);
              })
          })
          .catch(e => {
            console.log(e);
          })
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
          onFinish={handleAddStaff}
        >
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
      </IonModal>
    </IonContent>
  );
};

export default AddStaff;
