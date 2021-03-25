import React, {useEffect, useState} from "react";
import NurseryDataService from '../../../services/nursery';
import ChildItem from "./ChildItem";
import {Card, List} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {IonButton} from "@ionic/react";
import AuthService from '../../../services/auth';
import AddEntry from "../journal/AddEntry";
import AddChild from "./AddChild";

const ChildList = ({nurseryId}) => {
  const [children, setChildren] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);

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
            id={child.id}
            firstName={child.first_name}
            surname={child.surname}
            image={child.image}
          />
        )}
      />
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