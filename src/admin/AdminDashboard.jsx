import React, {useEffect, useState} from "react";
import AuthService from '../services/auth';
import NurseryDataService from '../services/nursery';
import {Button, Card, List,  Tabs} from "antd";
import {CheckOutlined, CloseOutlined, SettingOutlined} from "@ant-design/icons";
import http from '../shared/http-common';
import Applications from "./Applications";
import Nurseries from "./Nurseries";
import {
  IonAvatar,
  IonButtons, IonChip,
  IonContent,
  IonHeader, IonImg,
  IonItem, IonLabel,
  IonList,
  IonMenu, IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import history from "../history";
import Logout from "../common/Logout";
const { TabPane } = Tabs;

const AdminDashboard = props => {
  const currentUser = AuthService.getCurrentUser();
  const [nurseries, setNurseries] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    NurseryDataService.getAllPending()
      .then(response => {
        setNurseries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleApprove = nursery => {
    const name = 'person';
    const email = nursery.email;
    const subject = 'Nursery Journal - complete registration';
    const message = `Hi, to complete your Nursery Journal registration for ${nursery.name}, click the link below http://localhost:8081/signup/${nursery.id}`;

    http.post("/send", {
      name,
      email,
      subject,
      message
    }).then(res => {
      alert(res)
    }).catch(err => {
      console.log(err)
    })

    NurseryDataService.approve(nursery.id)
      .then(
        response => {
          console.log(response.data);
        })
      .catch(e => {
          const resMessage =
            (e.response &&
              e.response.data &&
              e.response.data.message) ||
            e.message ||
            e.toString();
        }
      );
  };

  const handleDecline = nursery => {
    const name = 'person';
    const email = nursery.email;
    const subject = 'Nursery Journal - registration declined';
    const message = `Hi, your application for registration of ${nursery.name} can not be completed at this time.`;

    http.post("/send", {
      name,
      email,
      subject,
      message
    }).then(res => {
      alert(res)
    }).catch(err => {
      console.log(err)
    })

    NurseryDataService.delete(nursery.id)
      .then(
        response => {
          console.log(response.data);
        })
      .catch(e => {
          const resMessage =
            (e.response &&
              e.response.data &&
              e.response.data.message) ||
            e.message ||
            e.toString();
        }
      );
  };

  return (
    <>
      <IonMenu side="start" menuId="first" contentId="my-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Nursery Admin Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Staff</IonItem>
            <IonItem>Kids</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="my-content"></IonRouterOutlet>
      <div className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
            <IonButtons slot="primary">
              <Logout/>
            </IonButtons>
            <IonTitle>Admin Dashboard</IonTitle>
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
              </IonAvatar>
              <IonLabel>{currentUser.username}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Tabs type="card">
            <TabPane tab="Applications" key="1">
              <Applications />
            </TabPane>
            <TabPane tab="Confirmed Nurseries" key="2">
              <Nurseries />
            </TabPane>
          </Tabs>
        </IonContent>
      </div>
    </>
  );
};

export default AdminDashboard;
