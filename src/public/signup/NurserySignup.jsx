import React, {useState} from "react";
import {IonContent, IonPage} from '@ionic/react';
import {Button, Form, Input,} from "antd";
import NurseryDataService from "../../services/nursery";
import Nav from "../Nav";

const NurserySignup = () => {

  // TO DO: on submit, create nursery
  // create user? separate?
  // add admin role to db
  // admin should be able to add staff, children and carers - generate usernames and passwords
  // address of nursery to be used in google map based on user's location, shows nearest nurseries
  // only northern ireland postcodes
  const [image, setImage] = useState();

  const handleSignup = ({
                          name,
                          contactName,
                          email,
                          phone,
                          addressLine1,
                          addressLine2,
                          town,
                          county,
                          postcode,
                        }) => {
    if (!image) {
      console.error('No image supplied. Need to add validation for this.');
      return;
    }
    const formData = new FormData();
    console.log("formData: ", formData);
    formData.append('image', image, image.name);
    formData.append('name', name);
    formData.append('contactName', contactName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('town', town);
    formData.append('county', county);
    formData.append('postcode', postcode);

    console.log("append: ", formData);
    NurseryDataService.signup(
      formData
    ).then(
      response => {
        console.log(response.data);
        console.log("signup successful");
      })
      .catch(e => {
          const resMessage =
            (e.response &&
              e.response.data &&
              e.response.data.message) ||
            e.message ||
            e.toString();
        }
      );
  };

  return (
    <>
      <IonPage>
        <Nav/>
        <IonContent>
          Please enter your nursery's details below. You will then receive an email with details on how to set up your
          account.

          <div
            style={{
              'display': 'flex',
              'flexDirection': 'column',
              'padding': '50px',
              width: '100%',
              'maxWidth': '600px'
            }}>
            <Form
              name="basic"
              initialValues={{remember: true}}
              onFinish={handleSignup}
            >
              <Form.Item
                label="Nursery Name"
                name="name"
                rules={[{required: true, message: 'Please input the nursery name!'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="Contact Name"
                name="contactName"
                rules={[{required: true, message: 'Please add a contact name!'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please add an email address!'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{required: true, message: 'Please add a phone number'}]}
              >
                <Input placeholder="Phone Number"/>
              </Form.Item>

              <Form.Item
                label="Address"
                name="addressLine1"
                rules={[{required: true, message: 'Please add an address!'}]}
              >
                <Input placeholder="Line 1"/>
              </Form.Item>

              <Form.Item
                name="addressLine2"
              >
                <Input placeholder="Line 2"/>
              </Form.Item>

              <Form.Item
                name="town"
                rules={[{required: true, message: 'Please add a town!'}]}
              >
                <Input placeholder="Town"/>
              </Form.Item>

              <Form.Item
                name="postcode"
                rules={[{required: true, message: 'Please add a postcode!'}]}
              >
                <Input placeholder="Postcode"/>
              </Form.Item>

              <Form.Item
                name="image"
                label="Upload an image of your nursery"
              >
                <input
                  name="image" // name of input field or fieldName simply
                  enctype="multipart/form-data"
                  type="file"
                  onChange={(event) => {
                    // setState method with event.target.files[0] as argument
                    setImage(event.target.files[0]);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default NurserySignup;
