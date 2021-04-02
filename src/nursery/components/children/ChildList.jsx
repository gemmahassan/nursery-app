import React, {useEffect, useState} from "react";
import NurseryDataService from '../../../services/nursery';
import ChildItem from "./ChildItem";
import {Card, List} from "antd";
import {IonButton} from "@ionic/react";
import AuthService from '../../../services/auth';
import AddChild from "./AddChild";
import Journal from "../journal/Journal";
import EditChild from "./EditChild";

const ChildList = ({nurseryId}) => {
  const [children, setChildren] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [journalData, setJournalData] = useState(null);
  const [childData, setChildData] = useState(null);

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (nurseryId) {
      getChildren();
    }
  }, [nurseryId]);

  const getChildren = () => {
    console.log(nurseryId);
    NurseryDataService.getChildren(nurseryId)
      .then(response => {
        setChildren(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  console.log('journalData', journalData);

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
      <>
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
          dataSource={children}
          renderItem={child => (
            <ChildItem
              child={child}
              showJournal={(child) => setJournalData(child)}
              editChild={(child) => setChildData(child)}
            />
          )}
        />
        {journalData &&
          <Journal
            children={[journalData]}
            role={'staff'}/>
        }
        {childData &&
        <EditChild
          child={childData}
          showAddModal={true}/>
        }
      </>
      {showAddModal &&
      <AddChild
        nurseryId={nurseryId}
        showAddModal={showAddModal}
      />
      }
    </>
  );
};

export default ChildList;