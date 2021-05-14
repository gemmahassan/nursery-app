import React, { useRef } from "react";
import { Checkbox, Form, Input, Modal } from "antd";
import { IonContent } from "@ionic/react";

const AddCarer = ({
  addSuccess,
  getOptions,
  handleAddCarer,
  hideAddCarerModal,
  showAddCarerModal,
}) => {
  const formElement = useRef();

  return (
    <IonContent>
      <Modal
        visible={showAddCarerModal}
        onCancel={() => {
          hideAddCarerModal();
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
          initialValues={{ remember: true }}
          onFinish={handleAddCarer}
        >
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

          <Form.Item label="child" name="child">
            <Checkbox.Group options={getOptions()} />
          </Form.Item>
        </Form>
        {addSuccess && <p>Added!</p>}
      </Modal>
    </IonContent>
  );
};
export default AddCarer;
