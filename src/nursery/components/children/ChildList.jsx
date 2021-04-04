import React, {useEffect, useState} from "react";
import NurseryDataService from '../../../services/nursery';
import ChildItem from "./ChildItem";
import {List} from "antd";
import {IonButton} from "@ionic/react";
import AuthService from '../../../services/auth';
import AddChild from "./AddChild";
import EditChild from "./EditChild";
import AddEntry from "../journal/AddEntry";

// add carer from child menu
// create carer, generate user id and password
// email password to carer
// add carer id and child to junction table

//This component renders a list of children
const ChildList = ({nurseryId, userId, showJournal}) => {
    const [children, setChildren] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddChildModal, setShowAddChildModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [journalData, setJournalData] = useState(null);
    const [childData, setChildData] = useState(null);

    // get the current user's details from the auth token
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
      if (nurseryId) {
        getChildren();
      }
    }, [nurseryId]);

    // get all children associated with the current nursery
    const getChildren = () => {
      NurseryDataService.getChildren(nurseryId)
        .then(response => {
          setChildren(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    return (
      <>
        {/*display a button to add a new child for admin users only*/}
        {currentUser.role === "admin" &&
        <div>
          <IonButton
            onClick={() => setShowAddChildModal(true)}
            shape="round">
            +
          </IonButton>
        </div>
        }

        <>
          <List
            itemLayout="horizontal"
            dataSource={children}
            // read round the list of children and create a list item for each one
            renderItem={child => (
              <ChildItem
                child={child}
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

          {showAddModal &&
          <AddEntry
            child={journalData}
            showAddModal={showAddModal}
            hideAddModal={() => setShowAddModal(false)}
            userId={userId}
          />
          }

          {showEditModal &&
          <EditChild
            child={childData}
            showEditModal={showEditModal}
            hideEditModal={() => setShowEditModal(false)}
            refreshChildren={() => getChildren()}
          />
          }
        </>

        <AddChild
          nurseryId={nurseryId}
          showAddChildModal={showAddChildModal}
          hideAddChildModal={() => setShowAddChildModal(false)}
          refreshChildren={() => getChildren()}
        />
      </>
    );
  }
;

export default ChildList;