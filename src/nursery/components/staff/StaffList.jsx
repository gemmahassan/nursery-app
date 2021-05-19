import React from "react";
import { IonButton } from "@ionic/react";
import { List } from "antd";
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
      {/*only show Add Staff button for admin users*/}
      {currentUser.role === "admin" && (
        <div>
          <IonButton onClick={() => setShowAddStaffModal(true)} shape="round">
            +
          </IonButton>
        </div>
      )}

      {/*map over each member of staff and display StaffItem component*/}
      <>
        <List
          itemLayout="horizontal"
          dataSource={staff}
          renderItem={(staffMember) => (
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

        {/*if edit staff was selected, show edit modal*/}
        {showEditStaffModal && (
          <EditStaffContainer
            staff={staffData}
            showEditStaffModal={showEditStaffModal}
            hideEditStaffModal={() => setShowEditStaffModal(false)}
            refreshStaff={() => getStaff()}
          />
        )}
      </>

      {/*show add staff modal based on showAddStaffModal*/}
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
