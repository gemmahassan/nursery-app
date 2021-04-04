import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Input, Modal, Switch} from "antd";
import {IonContent, IonModal} from "@ionic/react";
import ChildDataService from '../../../services/child';


const EditChild = ({child, hideEditModal, refreshChildren, showEditModal}) => {
  const formElement = useRef();

  const [currentChild, setCurrentChild] = useState(child);
  const [image, setImage] = useState();
  const [editSuccess, setEditSuccess] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(currentChild.photo);

  const handleUpdateChild = ({
                               first_name,
                               surname,
                               permission
                             }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    formData.append('permission', permission);
    if (image) {
      formData.append('image', image, image.name);
    }

    ChildDataService.update(child.id, formData)
      .then(response => {
        setEditSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    setCurrentChild(child);
  }, [child]);

  useEffect(() => {
    if (editSuccess) {
      refreshChildren();
    }
  }, [editSuccess]);

  return (
    <IonContent>
      <Modal
        visible={showEditModal}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        onCancel={() => {
          hideEditModal();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          ref={formElement}
          name="child"
          initialValues={{first_name: currentChild.first_name, surname: currentChild.surname}}
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
            <Switch checked={photoPermission}/>
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

        </Form>
        {editSuccess && (
          <p>Updated!</p>
        )}
      </Modal>
    </IonContent>
  );
};

export default EditChild;
