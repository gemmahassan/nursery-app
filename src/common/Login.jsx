import React, {useState} from "react";
import {
  Input,
  Form,
  Button,
  Checkbox,
} from 'antd';
import UserDataService from "../services/user";
import {IonContent, IonPage} from "@ionic/react";
import {useHistory} from "react-router";
import Nav from "../public/Nav";

const Login = () => {
  let history = useHistory();

  const [loginFailed, setLoginFailed] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // call login route to validate username and password
  // if successful, show relevant dashboard
  // if unsuccessful, show login failure message
  // if user has not completed sign up yet, prompt them to change their temporary password
  const handleLogin = ({username, password}) => {
    UserDataService.login(username, password)
      .then(response => {
        if (response.activated) {
          history.push("/dashboard");
          window.location.reload();
        } else {
          setChangePassword(true);
        }
      })
      .catch(() => setLoginFailed(true));
  };

  return (
    <IonPage>
      <Nav />
      <IonContent>
        <div
          style={{'display': 'flex', 'flexDirection': 'column', 'padding': '50px', width: '100%', 'maxWidth': '600px'}}>
          <h1>Login</h1>
          <Form
            name="basic"
            initialValues={{remember: true}}
            onFinish={handleLogin}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {loginFailed && (
              <p>Incorrect username or password</p>
            )}

            {changePassword && (
              <p>Please change your password</p>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;