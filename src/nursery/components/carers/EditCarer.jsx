import React, {useEffect, useRef, useState} from "react";
import {Button, Checkbox, Form, Input, Modal} from "antd";
import {IonContent} from "@ionic/react";
import UserDataService from '../../../services/user';
import NurseryDataService from "../../../services/nursery";
import CarerDataService from "../../../services/carer";

const EditCarer = ({carer, hideEditCarerModal, nurseryId, refreshCarer, showEditCarerModal}) => {
  const formElement = useRef();

  const [currentCarer, setCurrentCarer] = useState(carer);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [children, setChildren] = useState([]);

  const handleUpdateCarer = ({
                               first_name,
                               surname,
                               child,
                             }) => {
    console.log("clicked");
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);
    const selectedChildren = child;

    UserDataService.update(carer.id, formData)
      .then(response => {
        selectedChildren.forEach(child => {
          CarerDataService.addCarer(carer.id, child)
            .then(() => {
              setEditSuccess(true);
            })
            .catch(e => console.log(e))
        })
        setEditSuccess(true);
      })
      .catch(e => console.log(e));
  };

  const handleDelete = () => {
    UserDataService.delete(carer.id)
      .then(response => {
        setDeleteSuccess(true);
        hideEditCarerModal();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getChildren = () => {
    NurseryDataService.getChildren(nurseryId)
      .then(response => {
        setChildren(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getOptions = () => {
    const options = children.map(child => {
      return {
        label: `${child.first_name} ${child.surname}`,
        value: child.id,
      }
    });
    return options;
  };

  useEffect(() => {
    setCurrentCarer(carer);
  }, [carer]);

  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      refreshCarer();
    }
  }, [editSuccess, deleteSuccess]);

  useEffect(() => {
    getChildren();
  }, []);

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
          <Button
            key="cancel"
            onClick={() => hideEditCarerModal()}>
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
          name="carer"
          initialValues={{first_name: currentCarer.first_name, surname: currentCarer.surname}}
          onFinish={handleUpdateCarer}>
          Update Carer Info
          <Form.Item
            label="First Name"
            name="first_name"
          >
            <Input
              placeholder={currentCarer.first_name}
            />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
          >
            <Input
              placeholder={currentCarer.surname}
            />
          </Form.Item>

          <Form.Item
            label="child"
            name="child"
          >
            <Checkbox.Group options={getOptions()}/>
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

export default EditCarer;
