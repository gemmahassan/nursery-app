import React, {useEffect, useState} from "react";
import UserDataService from '../../../services/user';
import {IonButton} from "@ionic/react";
import {List} from "antd";
import AuthService from "../../../services/auth";
import CarerItem from "./CarerItem";
import AddChild from "../children/AddChild";
import AddCarer from "./AddCarer";
import EditStaff from "../staff/EditStaff";
import EditCarer from "./EditCarer";

const CarerList = ({nurseryId}) => {
  const [carers, setCarers] = useState([]);
  const [carerData, setCarerData] = useState(null);
  const [showAddCarerModal, setShowAddCarerModal] = useState(false);
  const [showEditCarerModal, setShowEditCarerModal] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  const getCarers = () => {
    UserDataService.getCarers(nurseryId)
      .then(response => {
        setCarers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCarers();
  }, []);

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
              editCarer={(carer) => {
                setCarerData(carer);
                setShowEditCarerModal(true);
              }}
            />
          )}
        />

        {showEditCarerModal &&
        <EditCarer
          carer={carerData}
          showEditCarerModal={showEditCarerModal}
          hideEditCarerModal={() => setShowEditCarerModal(false)}
          refreshCarer={() => getCarers()}
          nurseryId={nurseryId}
        />
        }
      </>

      <AddCarer
        nurseryId={nurseryId}
        showAddCarerModal={showAddCarerModal}
        hideAddCarerModal={() => setShowAddCarerModal(false)}
        refreshCarers={() => getCarers()}
      />
    </>
  );
};

export default CarerList;
