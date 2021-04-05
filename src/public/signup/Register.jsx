import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import UserDataService from '../../services/user';
import {Button, Checkbox, Form, Input} from "antd";
import Login from "../../common/Login";

const Register = () => {
  const params = useLocation();
  const query = new URLSearchParams(params.search);
  const token = query.get('token'); // bar
  console.log("token: ", token);

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [user, setUser] = useState();

  const getUser = () => {
    UserDataService.getUser(token)
      .then(response => {
        setUser(response.data);
      })
      .catch(e => console.log(e));
  };

  const handleRegister = ({password}) => {
    UserDataService.register(user[0].id, password)
      .then(() => {
        setRegistrationComplete(true);
      })
  }

  useEffect(() => {
    getUser();
  }, [token]);


  console.log(user);
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
     <Login />
      }
    </div>
  );
};

export default Register;