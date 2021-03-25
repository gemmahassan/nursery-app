import React, {useEffect, useState} from "react";
import StaffItem from "./StaffItem";
import StaffDataService from '../../../services/staff';
import NurseryDataService from "../../../services/nursery";
import {IonButton} from "@ionic/react";
import {List} from "antd";
import ChildItem from "../children/ChildItem";
import AddChild from "../children/AddChild";
import AuthService from "../../../services/auth";
import AddStaff from "./AddStaff";


const StaffList = ({nurseryId}) => {
  const [staff, setStaff] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = () => {
    StaffDataService.getStaffByNurseryId(nurseryId)
      .then(response => {
        setStaff(response.data);
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
          onClick={() => setShowAddModal(true)}
          shape="round">
          +
        </IonButton>
      </div>
      }
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={staff}
        renderItem={staffMember => (
          <ChildItem
            id={staffMember.id}
            firstName={staffMember.first_name}
            surname={staffMember.surname}
            image={staffMember.image}
          />
        )}
      />
      {showAddModal &&
      <AddStaff
        nurseryId={nurseryId}
        showAddModal={showAddModal}
      />
      }
    </>
  );
};

export default StaffList;
