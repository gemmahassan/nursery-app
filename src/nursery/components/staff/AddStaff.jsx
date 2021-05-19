import React, { useRef } from "react";
import { IonContent } from "@ionic/react";
import { Button, Form, Input, Modal } from "antd";

const AddStaff = ({
  addSuccess,
  handleAddStaff,
  hideAddStaffModal,
  showAddStaffModal,
}) => {
  // store reference to form
  const formElement = useRef();

  return (
    <IonContent>
      <Modal
        visible={showAddStaffModal}
        okText="Save"
        cancelText="Cancel"
        footer={[
          <Button key="cancel" onClick={() => hideAddStaffModal()}>
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
        ]}
      >
        <Form ref={formElement} name="staff" onFinish={handleAddStaff}>
          Add a new staff member
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Please add a first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Please add a surname" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please add an email address" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        {addSuccess && <p>Added!</p>}
      </Modal>
    </IonContent>
  );
};

export default AddStaff;
