import React, { useRef } from "react";
import { Button, Form, Input, Modal, Switch } from "antd";
import { IonContent } from "@ionic/react";

const EditChild = ({
  currentChild,
  deleteSuccess,
  editSuccess,
  handleDelete,
  handleUpdateChild,
  hideEditModal,
  photoPermission,
  setImage,
  setPhotoPermission,
  showEditModal,
}) => {
  const formElement = useRef();

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
        footer={[
          <Button key="cancel" onClick={() => hideEditModal()}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => {
              formElement.current && formElement.current.submit();
            }}
          >
            Save
          </Button>,
          <Button key="delete" type="danger" onClick={() => handleDelete()}>
            DELETE
          </Button>,
        ]}
      >
        <Form
          ref={formElement}
          name="child"
          initialValues={{
            first_name: currentChild.first_name,
            surname: currentChild.surname,
          }}
          onFinish={handleUpdateChild}
        >
          Update Child Info
          <Form.Item label="First Name" name="first_name">
            <Input placeholder={currentChild.firstName} />
          </Form.Item>
          <Form.Item label="Surname" name="surname">
            <Input placeholder={currentChild.surname} />
          </Form.Item>
          <Form.Item
            name="permission"
            label="Permission to share photos of this child?"
            onClick={() => setPhotoPermission(!photoPermission)}
          >
            <Switch checked={photoPermission} />
          </Form.Item>
          {photoPermission === 0 && (
            <Form.Item name="image" label="Add an image">
              <input
                name="image" // name of input field or fieldName simply
                encType="multipart/form-data"
                type="file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </Form.Item>
          )}
        </Form>
        {editSuccess && <p>Updated!</p>}

        {deleteSuccess && <p>Deleted</p>}
      </Modal>
    </IonContent>
  );
};

export default EditChild;
