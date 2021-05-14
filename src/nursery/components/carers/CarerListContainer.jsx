import React, { useEffect, useState } from "react";
import UserDataService from "../../../services/user";
import { IonButton } from "@ionic/react";
import { List } from "antd";
import AuthService from "../../../services/auth";
import CarerItem from "./CarerItem";
import AddChild from "../children/AddChild";
import AddCarer from "./AddCarer";
import EditStaff from "../staff/EditStaff";
import EditCarer from "./EditCarer";
import CarerList from "./CarerList";

const CarerListContainer = ({ nurseryId }) => {
  const [carers, setCarers] = useState([]);
  const [carerData, setCarerData] = useState(null);
  const [showAddCarerModal, setShowAddCarerModal] = useState(false);
  const [showEditCarerModal, setShowEditCarerModal] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  const getCarers = () => {
    UserDataService.getCarers(nurseryId)
      .then((response) => setCarers(response.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getCarers();
  }, []);

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
