import React, {useState} from "react";
import {
  IonAlert,
  IonAvatar, IonButton,
  IonButtons, IonChip,
  IonContent,
  IonHeader,
  IonItem, IonLabel,
  IonList,
  IonMenu, IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {Result, Layout, Row, Col} from "antd";
import { SmileOutlined } from '@ant-design/icons';
import Logout from "../../../common/Logout";
import ChildList from "../children/ChildList";
import StaffList from "../staff/StaffList";
import NurseryCalendarContainer from "../calendar/NurseryCalendarContainer";
import CarerList from "../carers/CarerList";
import JournalContainer from "../journal/JournalContainer";
import '../../style.css';

const NurseryDashboard = ({
                            currentUser,
                            deactivated,
                            handleDeactivate,
                            nursery,
                            setShowConfirmModal,
                            showConfirmModal
                          }) => {
  const [journalContent, setJournalContent] = useState(null);
  const [activeItem, setActiveItem] = useState('children');

  return (
    <div>
      <IonMenu side="start" menuId="first" contentId="my-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Nursery Admin Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem
              onClick={() => setActiveItem('children')}>
            Children</IonItem>
            <IonItem onClick={() => setActiveItem('staff')}>
              Staff</IonItem>
            <IonItem onClick={() => setActiveItem('carers')}>
              Carers</IonItem>
            <IonItem
              onClick={() => setActiveItem('calendar')}>
              Calendar
            </IonItem>
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
              <IonButton
                type={"primary"}
                shape={"round"}
                onClick={() => setShowConfirmModal(true)}>
                Deactivate this account
              </IonButton>
              <Logout/>
            </IonButtons>
            <IonTitle>{`${nursery.name} Staff Dashboard`}</IonTitle>
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
              </IonAvatar>
              <IonLabel>{currentUser.firstName} {currentUser.surname}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>


        {showConfirmModal &&
        <IonAlert
          isOpen={showConfirmModal}
          onDidDismiss={() => setShowConfirmModal(false)}
          header={`Confirm deactivation`}
          message={`Do you want to deactivate your account? You will have 90 days to reactivate your account before the data is permanently deleted`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Deactivate',
              handler: () => {
                handleDeactivate();
              }
            }
          ]}
        />
        }

        {!deactivated && (
          <IonContent>
            <Layout>
              {activeItem === 'children' &&
              <Row>
                <Col span={6}>
                  <ChildList
                    userId={currentUser.userId}
                    nurseryId={nursery.id}
                    showJournal={(child) => setJournalContent(child)}
                  />
                </Col>
                <Col span={18}>
                  {journalContent ?
                    <JournalContainer
                      children={[journalContent]}
                      role={'staff'}
                    /> : <Result
                      icon={<SmileOutlined color={'#e87ad0'} />}
                      title="Please select a child from the list to get started."
                    />
                  }
                </Col>
              </Row>
              }
              {activeItem === 'carers' &&
              <CarerList
                nurseryId={nursery.id}/>
              }
              {activeItem === 'staff' &&
              <StaffList
                nurseryId={nursery.id}/>
              }
              {activeItem === 'calendar' &&
              <NurseryCalendarContainer
                nurseryName={nursery.name}
                nurseryId={nursery.id}
              />
              }
          </Layout>
          </IonContent>
          )}

        {deactivated && (
          <h1>DEACTIVATED</h1>
        )}
      </div>
    </div>
  );
};

export default NurseryDashboard;
