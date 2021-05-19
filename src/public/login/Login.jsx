import React from "react";
import { Input, Form, Button, Checkbox } from "antd";
import { IonContent, IonPage } from "@ionic/react";
import Nav from "../Nav";

// render a login component to enter username and password
const Login = ({ handleLogin, loginFailed, noAccount }) => {
  return (
    <IonPage>
      <Nav />
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "50px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <h1>Login</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {loginFailed && <p>Incorrect username or password</p>}

            {noAccount && (
              <p>
                No active account for this username. Check your email for an
                activation link or contact your administrator
              </p>
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
