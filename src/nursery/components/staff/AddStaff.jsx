import React, {useState} from "react";
import Nav from "../../../common/Nav";
import {IonContent, IonInput, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import StaffDataService from "../../../services/staff";
import {Button, Form, Input} from "antd";

const AddStaff = ({nurseryId, showAddModal}) => {
  const [staff, setStaff] = useState([]);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  const handleAddStaff = ({
                            first_name,
                            surname
                          }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    formData.append('image', image, image.name);
    formData.append('nursery_id', nurseryId);

    StaffDataService.create(formData, nurseryId)
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
          initialValues={{remember: true}}
          onFinish={handleAddStaff}>
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

export default AddStaff;
