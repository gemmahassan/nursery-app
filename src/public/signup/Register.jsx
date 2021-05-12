import React from "react";
import LoginContainer from "../login/LoginContainer";
import SetPassword from "./SetPassword";

const Register = ({
                    handleSetPassword,
                    registrationComplete,
                    user
                  }) => {
  return (
    <div>
      {(user && !registrationComplete) &&
      <SetPassword
        handleSetPassword={handleSetPassword}
        user={user}
      />
      }

      {registrationComplete &&
      <LoginContainer/>
      }
    </div>
  );
};

export default Register;