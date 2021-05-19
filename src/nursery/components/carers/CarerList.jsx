import React from "react";
import { IonButton } from "@ionic/react";
import { List } from "antd";
import CarerItemContainer from "./CarerItemContainer";
import EditCarerContainer from "./EditCarerContainer";
import AddCarerContainer from "./AddCarerContainer";

// renders a list of carers
const CarerList = ({
  carerData,
  carers,
  currentUser,
  getCarers,
  nurseryId,
  setCarerData,
  setShowAddCarerModal,
  setShowEditCarerModal,
  showAddCarerModal,
  showEditCarerModal,
}) => {
  // if user is admin, show the add carer option
  return (
    <>
      {currentUser.role === "admin" && (
        <div>
          <IonButton onClick={() => setShowAddCarerModal(true)} shape="round">
            +
          </IonButton>
        </div>
      )}
      <>
        {/*map over list of carers rendering an item component for each*/}
        <List
          itemLayout="horizontal"
          dataSource={carers}
          renderItem={(carer) => (
            <CarerItemContainer
              carer={carer}
              currentUser={currentUser}
              editCarer={(carer) => {
                setCarerData(carer);
                setShowEditCarerModal(true);
              }}
            />
          )}
        />

        {/*if edit button was clicked, show modal*/}
        {showEditCarerModal && (
          <EditCarerContainer
            carer={carerData}
            showEditCarerModal={showEditCarerModal}
            hideEditCarerModal={() => setShowEditCarerModal(false)}
            refreshCarer={() => getCarers()}
            nurseryId={nurseryId}
          />
        )}
      </>

      {/*show add carer modal based on showAddCarerModal*/}
      <AddCarerContainer
        nurseryId={nurseryId}
        showAddCarerModal={showAddCarerModal}
        hideAddCarerModal={() => setShowAddCarerModal(false)}
        refreshCarers={() => getCarers()}
      />
    </>
  );
};

export default CarerList;
