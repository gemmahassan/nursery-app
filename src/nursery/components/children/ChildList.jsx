import React, {useEffect, useState} from "react";
import NurseryDataService from '../../../services/nursery';
import ChildItem from "./ChildItem";
import {List} from "antd";
import {IonButton} from "@ionic/react";
import AuthService from '../../../services/auth';
import AddChild from "./AddChild";
import EditChild from "./EditChild";
import AddEntry from "../journal/AddEntry";

const ChildList = ({nurseryId, userId, showJournal}) => {
    const [children, setChildren] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddChildModal, setShowAddChildModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [journalData, setJournalData] = useState(null);
    const [childData, setChildData] = useState(null);

    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
      if (nurseryId) {
        getChildren();
      }
    }, [nurseryId]);

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