import React, {useEffect, useState} from "react";
import UserDataService from '../../../services/user';
import {IonButton} from "@ionic/react";
import {List} from "antd";
import AuthService from "../../../services/auth";
import CarerItem from "./CarerItem";
import AddChild from "../children/AddChild";
import AddCarer from "./AddCarer";

const Carer = ({nurseryId}) => {
  const [carers, setCarers] = useState([]);
  const [showAddCarerModal, setShowAddCarerModal] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    getCarers();
  }, []);

  const getCarers = () => {
    UserDataService.getCarers(nurseryId)
      .then(response => {
        setCarers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      {currentUser.role === "admin" &&
      <div>
        <IonButton
          onClick={() => setShowAddCarerModal(true)}
          shape="round">
          +
        </IonButton>
      </div>
      }
      <>
        <List
         itemLayout="horizontal"
          dataSource={carers}
          renderItem={carer => (
            <CarerItem
              carer={carer}
            />
          )}
        />
      </>

      <AddCarer
        nurseryId={nurseryId}
        showAddCarerModal={showAddCarerModal}
        hideAddCarerModal={() => setShowAddCarerModal(false)}
        refreshCarers={() => getCarers()}
      />

      {/*{showAddModal &&*/}
      {/*<AddStaff*/}
      {/*  nurseryId={nurseryId}*/}
      {/*  showAddModal={showAddModal}*/}
      {/*/>*/}
      {/*}*/}
    </>
  );
};

export default Carer;
