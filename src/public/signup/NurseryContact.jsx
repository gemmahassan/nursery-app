import React, {useState} from "react";
import {IonContent, IonPage} from '@ionic/react';
import {Button, Form, Input,} from "antd";
import NurseryDataService from "../../services/nursery";
import Nav from "../Nav";
import {CirclePicker} from "react-color";
import {debounce} from 'throttle-debounce';
import register from "../images/register.jpeg";
import '../styles.css';

const NurseryContact = () => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [signupSuccessful, setSignupSuccessful] = useState(false);

  // TO DO: on submit, create nursery
  // create user? separate?
  // add admin role to db
  // admin should be able to add staff, children and carers - generate usernames and passwords
  // address of nursery to be used in google map based on user's location, shows nearest nurseries
  // only northern ireland postcodes
  const apiKey = 'aDUOicMHl0-6XpwvlhUH4w30713';

  const colors = [
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#00bcd4",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ff9800",
    "#607d8b"];

  const handlePostcodeChange = debounce(1000, (value) => {
    console.log(value);
    fetch(`https://api.getAddress.io/find/${value}?api-key=${apiKey}`)
      .then(res => res.json())
      .then(response => {
        setLatitude(response.latitude);
        setLongitude(response.longitude);
        console.log(response);
      })
      .catch(console.log)
  });

  const handleSignup = ({
                          name,
                          contactFirstName,
                          contactSurname,
                          email,
                          phone,
                          addressLine1,
                          addressLine2,
                          town,
                          county,
                          postcode,
                        }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact_first_name', contactFirstName);
    formData.append('contact_surname', contactSurname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('town', town);
    formData.append('county', county);
    formData.append('postcode', postcode);
    formData.append('color', color);
    formData.append('image', image, image.name);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    NurseryDataService.contact(formData).then(
      () => setShowSuccess(true))
      .catch(e => console.log(e)
      );
  };

  return (
    <>
      <IonPage>
        <Nav/>
        <IonContent>
          {!showSuccess && (
            <div style={{
              display: 'flex'
            }}>
              <div
                style={{
                  'display': 'flex',
                  'flexDirection': 'column',
                  'padding': '0 50px 50px 50px',
                  width: '100%',
                  'maxWidth': '40%'
                }}>
                <h1>Join Us!</h1>
                <p>If you are interested in signing your nursery up for this service, please enter your nursery name and an
                  administrator's contact details below. Someone from our team will be in touch within 24 hours to discuss
                  our plans.</p>
                <Form
                  name="basic"
                  layout={'vertical'}
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

                  <h2>Manager's Name</h2>
                  <Form.Item
                    label="First Name"
                    name="contactFirstName"
                    rules={[{required: true, message: 'Please add a first name!'}]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label="Surname"
                    name="contactSurname"
                    rules={[{required: true, message: 'Please add a surname!'}]}
                  >
                    <Input/>
                  </Form.Item>
                  <h2>Contact Information</h2>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please add an email address!'}]}
                  >
                    <Input/>
                    <span><i>Note that this will used to login to the nursery system once your account has been set up</i></span>
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
                           onChange={({target: {value}}) => handlePostcodeChange(value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="image"
                    label="Upload an image of your nursery"
                  >
                    <input
                      name="image"
                      encType="multipart/form-data"
                      type="file"
                      onChange={(event) => {
                        setImage(event.target.files[0]);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="color"
                    label="Select a theme colour for your nursery">
                    <CirclePicker
                      colors={colors}
                      onChangeComplete={color => setColor(color.hex)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div style={{
                'backgroundImage': `url(${register})`,
                'backgroundSize': 'cover',
                position: 'fixed',
                height: '100%',
                width: '60%',
                right: 0,
                pointerEvents: 'none',
                borderLeft: '10px solid pink'
              }}>
              </div>
            </div>
          )}
          {showSuccess && (
            <p>Thank you. Someone will be in touch soon to confirm your registration.</p>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default NurseryContact;
