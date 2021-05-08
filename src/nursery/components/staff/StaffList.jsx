import React from "react";
import {IonButton} from "@ionic/react";
import {List} from "antd";
import AddStaff from "./AddStaff";
import StaffItem from "./StaffItem";
import EditStaff from "./EditStaff";
import StaffItemContainer from "./StaffItemContainer";
import EditStaffContainer from "./EditStaffContainer";
import AddStaffContainer from "./AddStaffContainer";

const StaffList = ({
                     currentUser,
                     getStaff,
                     nurseryId,
                     showAddStaffModal,
                     showEditStaffModal,
                     setShowAddStaffModal,
                     setShowEditStaffModal,
                     setStaffData,
                     staff,
                     staffData,
                   }) => {
  return (
    <>
      {currentUser.role === "admin" &&
      <div>
        <IonButton
          onClick={() => {
            console.log('clicked');
            setShowAddStaffModal(true);
          }}
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
            <StaffItemContainer
              currentUser={currentUser}
              staff={staffMember}
              editStaff={(staffMember) => {
                setStaffData(staffMember);
                setShowEditStaffModal(true);
              }}
            />
          )}
        />

        {showEditStaffModal &&
        <EditStaffContainer
          staff={staffData}
          showEditStaffModal={showEditStaffModal}
          hideEditStaffModal={() => setShowEditStaffModal(false)}
          refreshStaff={() => getStaff()}
        />
        }
      </>

      <AddStaffContainer
        nurseryId={nurseryId}
        showAddStaffModal={showAddStaffModal}
        hideAddStaffModal={() => setShowAddStaffModal(false)}
        refreshStaff={() => getStaff()}
      />
    </>
  );
};

export default StaffList;
