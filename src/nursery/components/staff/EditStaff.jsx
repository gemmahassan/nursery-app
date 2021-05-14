import React, { useRef } from "react";
import { Button, Form, Input, Modal } from "antd";
import { IonContent } from "@ionic/react";

const EditStaff = ({
  currentStaff,
  deleteSuccess,
  editSuccess,
  handleDelete,
  handleUpdateStaff,
  hideEditStaffModal,
  showEditStaffModal,
}) => {
  const formElement = useRef();

  return (
    <IonContent>
      <Modal
        visible={showEditStaffModal}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        onCancel={() => {
          hideEditStaffModal();
        }}
        footer={[
          <Button key="cancel" onClick={() => hideEditStaffModal()}>
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
          name="staff"
          initialValues={{
            first_name: currentStaff.first_name,
            surname: currentStaff.surname,
          }}
          onFinish={handleUpdateStaff}
        >
          Update Staff Info
          <Form.Item label="First Name" name="first_name">
            <Input placeholder={currentStaff.first_name} />
          </Form.Item>
          <Form.Item label="Surname" name="surname">
            <Input placeholder={currentStaff.surname} />
          </Form.Item>
        </Form>

        {editSuccess && <p>Updated!</p>}

        {deleteSuccess && <p>Deleted</p>}
      </Modal>
    </IonContent>
  );
};

export default EditStaff;
