import React, { useState } from "react";
import UserDataService from "../../services/user";
import { useHistory } from "react-router";
import Login from "./Login";

const LoginContainer = () => {
  let history = useHistory();

  const [loginFailed, setLoginFailed] = useState(false);
  const [noAccount, setNoAccount] = useState(false);

  // call login route to validate username and password
  // if successful, show relevant dashboard
  // if unsuccessful, show login failure message
  // if user has not completed sign up yet, prompt them to change their temporary password
  const handleLogin = ({ username, password }) => {
    UserDataService.login(username, password)
      .then((response) => {
        if (response.activated) {
          history.push("/dashboard");
          window.location.reload();
        } else {
          setNoAccount(true);
        }
      })
      .catch(() => setLoginFailed(true));
  };

  return (
    <Login
      handleLogin={handleLogin}
      loginFailed={loginFailed}
      noAccount={noAccount}
    />
  );
};

export default LoginContainer;
