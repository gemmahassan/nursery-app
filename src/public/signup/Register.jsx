import React from "react";
import LoginContainer from "../login/LoginContainer";
import SetPassword from "./SetPassword";
import { Alert } from "antd";

const Register = ({ handleSetPassword, registrationComplete, user }) => {
  return (
    <div>
      {user && !registrationComplete && (
        <SetPassword handleSetPassword={handleSetPassword} user={user} />
      )}

      {!user && (
        <Alert
          message="Error"
          description="This link is invalid. Please contact the Nursery Journal administrators."
          type="error"
          showIcon
        />
      )}

      {registrationComplete && <LoginContainer />}
    </div>
  );
};

export default Register;
