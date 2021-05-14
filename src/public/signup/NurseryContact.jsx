import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Button, Form, Input, Alert } from "antd";
import Nav from "../Nav";
import { CirclePicker } from "react-color";
import register from "../images/register.jpeg";
import "../styles.css";

const NurseryContact = ({
  colors,
  handlePostcodeChange,
  handleSignup,
  showSuccess,
  setColor,
  setImage,
}) => {
  return (
    <>
      <IonPage>
        <Nav />
        <IonContent>
          {!showSuccess && (
            <div
              style={{
                display: "flex",
              }}
            >
              <div className={"contact"}>
                <h1>Join Us!</h1>
                <p>
                  If you are interested in signing your nursery up for this
                  service, please enter your nursery name and an administrator's
                  contact details below. Someone from our team will be in touch
                  within 24 hours to discuss our plans.
                </p>
                <Form
                  name="basic"
                  layout={"vertical"}
                  initialValues={{ remember: true }}
                  onFinish={handleSignup}
                  scrollToFirstError
                >
                  <Form.Item
                    label="Nursery Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the nursery name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <h2>Manager's Name</h2>
                  <Form.Item
                    label="First Name"
                    name="contactFirstName"
                    rules={[
                      { required: true, message: "Please add a first name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Surname"
                    name="contactSurname"
                    rules={[
                      { required: true, message: "Please add a surname!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <h2>Contact Information</h2>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <span>
                    <i>
                      Note that this will used to login to the nursery system
                      once your account has been set up
                    </i>
                  </span>

                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      { required: true, message: "Please add a phone number" },
                    ]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>

                  <Form.Item
                    label="Nursery Address"
                    name="addressLine1"
                    rules={[
                      { required: true, message: "Please add an address!" },
                    ]}
                  >
                    <Input placeholder="Line 1" />
                  </Form.Item>

                  <Form.Item name="addressLine2">
                    <Input placeholder="Line 2" />
                  </Form.Item>

                  <Form.Item
                    name="town"
                    rules={[{ required: true, message: "Please add a town!" }]}
                  >
                    <Input placeholder="Town" />
                  </Form.Item>

                  <Form.Item
                    name="county"
                    rules={[
                      { required: true, message: "Please add a county!" },
                    ]}
                  >
                    <Input placeholder="County" />
                  </Form.Item>

                  <Form.Item
                    name="postcode"
                    rules={[
                      { required: true, message: "Please add a postcode!" },
                    ]}
                  >
                    <Input
                      placeholder="Postcode"
                      onChange={({ target: { value } }) =>
                        handlePostcodeChange(value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="image"
                    label="Upload an image of your nursery"
                    rules={[
                      {
                        required: true,
                        message: "Please add an image of your nursery",
                      },
                    ]}
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
                    label="Select a theme colour for your nursery"
                  >
                    <CirclePicker
                      colors={colors}
                      onChangeComplete={(color) => setColor(color.hex)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div
                className={"contact-image"}
                style={{
                  backgroundImage: `url(${register})`,
                  backgroundSize: "cover",
                  position: "fixed",
                  height: "100%",
                  width: "60%",
                  right: 0,
                  pointerEvents: "none",
                  borderLeft: "10px solid #ce72e8",
                }}
              ></div>
            </div>
          )}

          {showSuccess && (
            <Alert
              message="Thank You"
              description="Someone will be in touch soon to confirm your registration.."
              type="success"
              showIcon
            />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default NurseryContact;
