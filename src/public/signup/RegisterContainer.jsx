import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import UserDataService from '../../services/user';
import Register from "./Register";
import {message} from "antd";

const RegisterContainer = () => {
  const params = useLocation();
  const query = new URLSearchParams(params.search);
  const token = query.get('token');

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [user, setUser] = useState();

  const getUser = () => {
    UserDataService.getUserForSignup(token)
      .then(response => setUser(response.data))
      .catch(e => console.log(e));
  };

  const handleSetPassword = ({password}) => {
    UserDataService.completeRegistration(user[0].id, password)
      .then(() => setRegistrationComplete(true))
  }

  useEffect(() => {
    getUser();
  }, [token]);


  return (
    <Register
      handleSetPassword={handleSetPassword}
      registrationComplete={registrationComplete}
      user={user}
    />
  );
};

export default RegisterContainer;