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
  const [showAddChild, setAddChild] = useState(false);
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
          onClick={() => setAddChild(true)}
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
              editChild={(child) => setChildData(child)}
            />
          )}
        />
        {journalData &&
          <AddEntry
            child={journalData}
            showAddModal={showAddModal}
            hideAddModal={() => setShowAddModal(false)}
            userId={userId}
          />
        }
        {childData &&
        <EditChild
          child={childData}
          showAddModal={true}/>
        }
      </>
      {showAddChild &&
      <AddChild
        nurseryId={nurseryId}
        showAddModal={showAddChild}
        refreshChildren={() => getChildren()}
      />
      }
    </>
  );
};

export default ChildList;