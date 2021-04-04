import React, {useState} from "react";
import {IonContent, IonPage} from '@ionic/react';
import {Button, Form, Input,} from "antd";
import NurseryDataService from "../../services/nursery";
import Nav from "../Nav";

const NurseryContact = () => {

  const [showSuccess, setShowSuccess] = useState(false);
  // TO DO: on submit, create nursery
  // create user? separate?
  // add admin role to db
  // admin should be able to add staff, children and carers - generate usernames and passwords
  // address of nursery to be used in google map based on user's location, shows nearest nurseries
  // only northern ireland postcodes
  const apiKey = 'aDUOicMHl0-6XpwvlhUH4w30713';

  // function debounce(func, wait) {
  //   let timeout;
  //   return function(...args) {
  //     const context = this;
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       timeout = null;
  //       func.apply(context, args);
  //     }, wait);
  //   };
  // }

  // const handlePostcodeChange = event => {
  //     fetch(`https://api.getAddress.io/find/${event.target.value}?api-key=${apiKey}`)
  //       .then(res => res.json())
  //       .then(response => {
  //         console.log(response);
  //       })
  //       .catch(console.log)
  // }

  const handleSignup = ({
                          name,
                          contactName,
                          email,
                          phone,
                          addressLine1,
                          addressLine2,
                          town,
                          county,
                          postcode
                        }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact_name', contactName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('county', county);
    formData.append('postcode', postcode);

    NurseryDataService.contact(formData).then(
      response => {
        setShowSuccess(true);
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
          {!showSuccess && (
            <>
              If you are interested in signing your nursery up for this service, please enter your nursery name and an
              administrator's contact details below. Someone from our team will be in touch within 24 hours to discuss
              our
              plans.

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

                  Manager's Name
                  <Form.Item
                    label="First Name"
                    name="contactFirstName"
                    rules={[{required: true, message: 'Please add a first name!'}]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label="SurName"
                    name="contactsurame"
                    rules={[{required: true, message: 'Please add a surname!'}]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label="Email - note that this will used to login to the nursery system once your account has been set up"
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
                    name="county"
                    rules={[{required: true, message: 'Please add a county!'}]}
                  >
                    <Input placeholder="County"/>
                  </Form.Item>

                  <Form.Item
                    name="postcode"
                    rules={[{required: true, message: 'Please add a postcode!'}]}
                  >
                    <Input placeholder="Postcode"
                    // onChange={debounce=(handlePostcodeChange, 200)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          )}
          {showSuccess && (
            <p>Thank you. Someone will be in touch soon to set up your account.</p>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default NurseryContact;
