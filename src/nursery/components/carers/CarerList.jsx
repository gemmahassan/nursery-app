import React from "react";
import { IonButton } from "@ionic/react";
import { List } from "antd";
import CarerItemContainer from "./CarerItemContainer";
import EditCarerContainer from "./EditCarerContainer";
import AddCarerContainer from "./AddCarerContainer";

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
