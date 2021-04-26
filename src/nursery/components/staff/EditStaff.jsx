import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import {IonContent} from "@ionic/react";
import UserDataService from '../../../services/user';

const EditStaff = ({staff, hideEditStaffModal, refreshStaff, showEditStaffModal}) => {
  const formElement = useRef();

  const [currentStaff, setCurrentStaff] = useState(staff);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleUpdateStaff = ({
                               first_name,
                               surname
  }) => {
    UserDataService.update(staff.id, first_name, surname)
      .then(response => {
        setEditSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDelete = () => {
    UserDataService.delete(staff.id)
      .then(response => {
        setDeleteSuccess(true);
        hideEditStaffModal();
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    setCurrentStaff(staff);
  }, [staff]);

  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      refreshStaff();
    }
  }, [editSuccess, deleteSuccess]);

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
          <Button
            key="cancel"
            onClick={() => hideEditStaffModal()}>
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
          <Button
            key="delete"
            type="danger"
            onClick={() => handleDelete()}
          >
            DELETE
          </Button>,
        ]}
      >
        <Form
          ref={formElement}
          name="staff"
          initialValues={{first_name: currentStaff.first_name, surname: currentStaff.surname}}
          onFinish={handleUpdateStaff}>
          Update Staff Info
          <Form.Item
            label="First Name"
            name="first_name"
          >
            <Input
              placeholder={currentStaff.first_name}
            />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
          >
            <Input
              placeholder={currentStaff.surname}
            />
          </Form.Item>

        </Form>

        {editSuccess && (
          <p>Updated!</p>
        )}

        {deleteSuccess && (
          <p>Deleted</p>
        )}
      </Modal>
    </IonContent>
  );
};

export default EditStaff;
