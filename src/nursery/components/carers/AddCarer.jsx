import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Checkbox, Form, Input, List, Modal, Select, Switch} from "antd";
import {IonContent, IonModal} from "@ionic/react";
import UserDataService from "../../../services/user";
import CarerDataService from "../../../services/carer";
import NurseryDataService from "../../../services/nursery";
import http from "../../../shared/http-common";


const AddCarer = ({hideAddCarerModal, nurseryId, showAddCarerModal, refreshCarers}) => {
    const formElement = useRef();

    const [image, setImage] = useState();
    const [addSuccess, setAddSuccess] = useState(false);
    const [children, setChildren] = useState([]);
    // const [photoPermission, setPhotoPermission] = useState(false);

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
    }

    const handleAddCarer = ({
                              first_name,
                              surname,
                              child,
                              email,
                            }) => {
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('surname', surname);
      formData.append('role', 'carer');
      formData.append('email', email);

      const selectedChildren = child;

      formData.append('nursery_id', nurseryId);

      UserDataService.create(formData, nurseryId)
        .then(response => {
          const userId = response.data.id;
          const carerFirstName = response.data.first_name;
          const carerSurname = response.data.surname;
          const token = response.data.token;
          const email = response.data.username;
          const subject = 'Nursery Journal - You have been added as a carer!';
          const message = `Hi ${carerFirstName}, you have been added as a carer.
                                  Please click on the link below to create a password and complete your registration
                                  http://localhost:8001/register?token=${token}`;

          http.post("/send", {
            carerFirstName,
            carerSurname,
            email,
            subject,
            message
          }).then(() => {
            selectedChildren.forEach(child => {
              CarerDataService.addCarer(userId, child)
                .then(response => {
                  setAddSuccess(true);
                })
                .catch(e => console.log(e))
            }).catch(e => console.log(e))
          }).catch(e => console.log(e));
        });
    };

    useEffect(() => {
      if (addSuccess) {
        refreshCarers();
      }
    }, [addSuccess]);

    useEffect(() => {
      getChildren();
    }, []);

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
            initialValues={{remember: true}}
            onFinish={handleAddCarer}>
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
              label="Email Address"
              name="email"
              rules={[{required: true, message: 'Please add an email address'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="child"
              name="child"
            >
              <Checkbox.Group options={getOptions()}/>
            </Form.Item>
          </Form>
          {addSuccess && (
            <p>Added!</p>
          )}
        </Modal>
      </IonContent>
    );
  }
;

export default AddCarer;