import React, { useEffect, useState } from "react";
import UserDataService from "../../../services/user";
import AuthService from "../../../services/auth";
import CarerList from "./CarerList";

const CarerListContainer = ({ nurseryId }) => {
  const [carers, setCarers] = useState([]);
  const [carerData, setCarerData] = useState(null);
  const [showAddCarerModal, setShowAddCarerModal] = useState(false);
  const [showEditCarerModal, setShowEditCarerModal] = useState(false);

  // get current user details from JWT
  const currentUser = AuthService.getCurrentUser();

  // call API to get a list of all carers associated with current nursery
  // save in carers array
  const getCarers = () => {
    UserDataService.getCarers(nurseryId)
      .then((response) => setCarers(response.data))
      .catch((e) => console.log(e));
  };

  // get list on page render
  useEffect(() => {
    getCarers();
  }, []);

  // pass props to CarerList component
  return (
    <CarerList
      carerData={carerData}
      carers={carers}
      currentUser={currentUser}
      getCarers={getCarers}
      nurseryId={nurseryId}
      setCarerData={setCarerData}
      setShowAddCarerModal={setShowAddCarerModal}
      setShowEditCarerModal={setShowEditCarerModal}
      showAddCarerModal={showAddCarerModal}
      showEditCarerModal={showEditCarerModal}
    />
  );
};

export default CarerListContainer;
