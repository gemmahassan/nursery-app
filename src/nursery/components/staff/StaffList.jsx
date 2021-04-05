import React, {useEffect, useState} from "react";
import UserDataService from '../../../services/user';
import {IonButton} from "@ionic/react";
import {List} from "antd";
import AuthService from "../../../services/auth";
import AddStaff from "./AddStaff";
import StaffItem from "./StaffItem";
import EditStaff from "./EditStaff";

const StaffList = ({nurseryId}) => {
  const [staff, setStaff] = useState([]);
  const [staffData, setStaffData] = useState(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  const getStaff = () => {
    UserDataService.getStaff(nurseryId)
      .then(response => {
        setStaff(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <>
      {currentUser.role === "admin" &&
      <div>
        <IonButton
          onClick={() => setShowAddStaffModal(true)}
          shape="round">
          +
        </IonButton>
      </div>
      }

      <>
        <List
          itemLayout="horizontal"
          dataSource={staff}
          renderItem={staffMember => (
            <StaffItem
              staff={staffMember}
              editStaff={(staffMember) => {
                setStaffData(staffMember);
                setShowEditStaffModal(true);
              }}
            />
          )}
        />

        {showEditStaffModal &&
        <EditStaff
          staff={staffData}
          showEditStaffModal={showEditStaffModal}
          hideEditStaffModal={() => setShowEditStaffModal(false)}
          refreshStaff={() => getStaff()}
        />
        }
      </>

      <AddStaff
        nurseryId={nurseryId}
        showAddStaffModal={showAddStaffModal}
        hideAddStaffModal={() => setShowAddStaffModal(false)}
        refreshStaff={() => getStaff()}
      />
    </>
  );
};

export default StaffList;
