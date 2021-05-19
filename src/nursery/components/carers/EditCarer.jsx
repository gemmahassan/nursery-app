import React, { useRef } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { IonContent } from "@ionic/react";

const EditCarer = ({
  currentCarer,
  deleteSuccess,
  editSuccess,
  getOptions,
  handleDelete,
  handleUpdateCarer,
  hideEditCarerModal,
  showEditCarerModal,
}) => {
  // store reference to form
  const formElement = useRef();

  // form to capture updated carer details
  return (
    <IonContent>
      <Modal
        visible={showEditCarerModal}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        onCancel={() => {
          hideEditCarerModal();
        }}
        footer={[
          <Button key="cancel" onClick={() => hideEditCarerModal()}>
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
          name="carer"
          initialValues={{
            first_name: currentCarer.first_name,
            surname: currentCarer.surname,
          }}
          onFinish={handleUpdateCarer}
        >
          Update Carer Info
          <Form.Item label="First Name" name="first_name">
            <Input placeholder={currentCarer.first_name} />
          </Form.Item>
          <Form.Item label="Surname" name="surname">
            <Input placeholder={currentCarer.surname} />
          </Form.Item>
          <Form.Item label="child" name="child">
            <Checkbox.Group options={getOptions()} />
          </Form.Item>
        </Form>

        {editSuccess && <p>Updated!</p>}

        {deleteSuccess && <p>Deleted</p>}
      </Modal>
    </IonContent>
  );
};

export default EditCarer;
