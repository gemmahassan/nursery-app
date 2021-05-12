import React from "react";
import {Button, Form, Input} from "antd";
import Nav from '../Nav';

const SetPassword = ({
                       handleSetPassword,
                       user
                     }) => {
  return (
    <>
      <Nav/>
      <div style={{margin: "20px"}}>
        <h1>Hi, <b>{user[0].first_name} {user[0].surname}</b></h1>
        <h2>Your application has been approved.</h2>
        <p>Almost there! We just need you to choose your password.</p>
      <Form
        name="basic"
        initialValues={{remember: true}}
        onFinish={handleSetPassword}
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please enter a new password!'}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password/>
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
};

export default SetPassword;