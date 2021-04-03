import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Form, Input, List, Modal, Select, Switch} from "antd";
import {IonContent, IonModal} from "@ionic/react";
import ChildDataService from '../../../services/child';


const AddChild = ({hideAddChildModal, nurseryId, showAddChildModal, refreshChildren}) => {
  const formElement = useRef();

  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(false);

  const handleAddChild = ({
                            first_name,
                            surname,
                            permission,
                          }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    formData.append('photo', permission);
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('nursery_id', nurseryId);

    ChildDataService.create(formData, nurseryId)
      .then(response => {
        setAddSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (addSuccess) {
      refreshChildren();
    }
  }, [addSuccess]);

  return (
    <IonContent>
      <Modal
        visible={showAddChildModal}
        onCancel={() => {
          hideAddChildModal();
        }}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          ref={formElement}
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
            name="permission"
            label="Permission to share photos of this child?"
            onClick={() => setPhotoPermission(!photoPermission)}
          >
            <Switch/>
          </Form.Item>

          {photoPermission && (
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
          )}
        </Form>
        {addSuccess && (
            <p>Added!</p>
          )}
      </Modal>
    </IonContent>
  );
};

export default AddChild;