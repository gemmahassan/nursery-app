import React from "react";
import { List } from "antd";
import { IonButton } from "@ionic/react";
import AddChildContainer from "./AddChildContainer";
import ChildItemContainer from "./ChildItemContainer";
import EditChildContainer from "./EditChildContainer";
import AddEntryContainer from "../journal/AddEntryContainer";

//This component renders a list of children
const ChildList = ({
  childData,
  children,
  currentUser,
  getChildren,
  journalData,
  nurseryId,
  setChildData,
  setJournalData,
  setShowAddChildModal,
  setShowAddModal,
  setShowEditModal,
  showAddChildModal,
  showAddModal,
  showEditModal,
  showJournal,
  userId,
}) => {
  return (
    <>
      {/*display a button to add a new child for admin users only*/}
      {currentUser.role === "admin" && (
        <div>
          <IonButton onClick={() => setShowAddChildModal(true)} shape="round">
            +
          </IonButton>
        </div>
      )}

      <div class={"child-scroller"}>
        <List
          itemLayout="horizontal"
          dataSource={children}
          // read round the list of children and create a list item for each one
          renderItem={(child) => (
            <ChildItemContainer
              child={child}
              currentUser={currentUser}
              showJournal={(child) => showJournal(child)}
              addJournal={(child) => {
                setJournalData(child);
                setShowAddModal(true);
              }}
              editChild={(child) => {
                setChildData(child);
                setShowEditModal(true);
              }}
            />
          )}
        />

        {showAddModal && (
          <AddEntryContainer
            child={journalData}
            showAddModal={showAddModal}
            hideAddModal={() => setShowAddModal(false)}
            userId={userId}
          />
        )}

        {showEditModal && (
          <EditChildContainer
            child={childData}
            showEditModal={showEditModal}
            hideEditModal={() => setShowEditModal(false)}
            refreshChildren={() => getChildren()}
          />
        )}
      </div>

      <AddChildContainer
        nurseryId={nurseryId}
        showAddChildModal={showAddChildModal}
        hideAddChildModal={() => setShowAddChildModal(false)}
        refreshChildren={() => getChildren()}
      />
    </>
  );
};
export default ChildList;
