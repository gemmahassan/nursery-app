import React, {useEffect, useRef, useState} from "react";
import {Form, Input, Modal} from "antd";
import {IonContent} from "@ionic/react";
import UserDataService from '../../../services/user';

const EditStaff = ({staff, hideEditStaffModal, refreshStaff, showEditStaffModal}) => {
  const formElement = useRef();

  const [currentStaff, setCurrentStaff] = useState(staff);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleUpdateStaff = ({
                               first_name,
                               surname
  }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);

    UserDataService.update(staff.id, formData)
      .then(response => {
        setEditSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    setCurrentStaff(staff);
  }, [staff]);

  useEffect(() => {
    if (editSuccess) {
      refreshStaff();
    }
  }, [editSuccess]);

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
        okText="Save"
        cancelText="Cancel"
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
      </Modal>
    </IonContent>
  );
};

export default EditStaff;
