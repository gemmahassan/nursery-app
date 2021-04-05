import React, {useState} from "react";
import {
  Input,
  Form,
  Button,
  Checkbox,
} from 'antd';
import AuthService from "../services/auth";
import {IonContent, IonPage} from "@ionic/react";
import {useHistory} from "react-router";

const Login = () => {
  let history = useHistory();

  const [loginFailed, setLoginFailed] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleLogin = ({username, password}) => {
    AuthService.login(username, password)
      .then(response => {
        if (response.activated) {
          history.push("/dashboard");
          window.location.reload();
        } else {
          setChangePassword(true);
        }
      })
      .catch(e => {
          setLoginFailed(true);
        }
      );
  };

  return (
    <IonPage>
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