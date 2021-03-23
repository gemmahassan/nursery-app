import React, {useEffect, useState} from "react";
import {IonContent, IonPage} from '@ionic/react';
import {Button, Form} from "antd";
import NurseryDataService from "../services/nursery";
import Nav from "../public/Nav";
import {useParams} from "react-router-dom";
import {CirclePicker} from 'react-color';


const NurserySignup = () => {
  // TO DO: on submit, create nursery
  // create user? separate?
  // add admin role to db
  // admin should be able to add staff, children and carers - generate usernames and passwords
  // address of nursery to be used in google map based on user's location, shows nearest nurseries
  // only northern ireland postcodes
  const [image, setImage] = useState();
  const [nursery, setNursery] = useState();
  const [color, setColor] = useState();
  const [signupSuccessful, setSignupSuccessful] = useState(false);

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

  const {nurseryId} = useParams();

  useEffect(() => {
    console.log("calling useEffect");
    getNursery();
    console.log("nursery: ", nursery);
  }, []);

  const getNursery = () => {
    NurseryDataService.get(nurseryId)
      .then(response => {
        setNursery(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleSignup = () => {
    if (!image) {
      console.error('No image supplied. Need to add validation for this.');
      return;
    }

    console.log("color: ", color);
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('color', color);

    NurseryDataService.signup(nurseryId, formData)
      .then(
        response => {
          setSignupSuccessful(true);
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

  const handleColorChange = color => {
    setColor(color.hex);
  }

  const getLayout = () => {
    if (nursery) {
      if (nursery.pending === 2) {
        return (
          <>already signed up</>
        );
      } else {
        return (
          <>
            Hi, welcome to Nursery Journal. To finish creating an account for {nursery.name}, please upload an image
            of
            your nursery and select a colour for your page branding.

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
                  <CirclePicker
                    colors={colors}
                    onChangeComplete={handleColorChange}
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
        );
      }
    } else {
      return (
        <>Nothing to see here</>
      );
    }
  }

  return (
    <>
      <IonPage>
        <Nav/>
        <IonContent>
          {getLayout()}
          {signupSuccessful && (
            <>Thank you! You can now use Nursery Journal</>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default NurserySignup;
