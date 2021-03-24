import React from "react";
import {
  Input,
  Form,
  Button,
  Checkbox,
} from 'antd';
import AuthService from "../../services/auth";
import {IonContent, IonPage} from "@ionic/react";

const Login = (props) => {
  const handleLogin = ({username, password}) => {
    AuthService.login(username, password).then(
      response => {
        console.log(response.data);
        props.history.push("/dashboard");
        window.location.reload();
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
    <IonPage>
      <IonContent>
        <div style={{'display': 'flex', 'flexDirection': 'column', 'padding': '50px', width: '100%', 'maxWidth': '600px'}}>
        <h1>Login</h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item  name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item >

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