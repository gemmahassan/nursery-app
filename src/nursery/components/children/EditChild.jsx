import React, {useState} from "react";
import {Button, Form, Input, Switch} from "antd";
import {IonContent, IonModal} from "@ionic/react";
import ChildDataService from '../../../services/child';


const EditChild = ({child, showAddModal}) => {
  const initialChildState = {
    id: child.id,
    firstName: child.first_name,
    surname: child.surname,
    image: "",
    photo: child.photo,
  };
  const [currentChild, setCurrentChild] = useState(initialChildState);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(child.photo);

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
            name="permission"
            label="Permission to share photos of this child?"
            onClick={() => setPhotoPermission(!photoPermission)}
          >
            <Switch
              checked={currentChild.photo}/>
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

          <Form.Item>
            <Button
              className="ion-float-right ion-padding"
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
