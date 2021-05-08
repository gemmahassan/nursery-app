import React from "react";
import {Button, Form, Input} from "antd";
import Login from "../login/Login";
import LoginContainer from "../login/LoginContainer";

const Register = ({
                    handleRegister,
                    registrationComplete,
                    user
                  }) => {
  return (
    <div>
      {(user && !registrationComplete) &&
      <>
        <p>Hi, {user[0].first_name} {user[0].surname}</p>
        <p>Please set a new password</p>
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={handleRegister}
        >
          <Form.Item
            label="password"
            name="password"
            rules={[{required: true, message: 'Please enter a new password!'}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            label="confirmPassword"
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
      </>
      }

      {registrationComplete &&
      <LoginContainer />
      }
    </div>
  );
};

export default Register;