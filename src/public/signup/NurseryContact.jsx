import React, {useState} from "react";
import {IonContent, IonPage} from '@ionic/react';
import {Button, Form, Input,} from "antd";
import NurseryDataService from "../../services/nursery";
import Nav from "../Nav";

const NurseryContact = () => {

  // TO DO: on submit, create nursery
  // create user? separate?
  // add admin role to db
  // admin should be able to add staff, children and carers - generate usernames and passwords
  // address of nursery to be used in google map based on user's location, shows nearest nurseries
  // only northern ireland postcodes

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
    NurseryDataService.signup(
      name,
      contactName,
      email,
      phone,
      addressLine1,
      addressLine2,
      town,
      county,
      postcode,
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
          If you are interested in signing your nursery up for this service, please enter your nursery name and an administrator's contact details below. Someone from our team will be in touch within 24 hours to discuss our plans.

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
                label="Nursery Address"
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

export default NurseryContact;
