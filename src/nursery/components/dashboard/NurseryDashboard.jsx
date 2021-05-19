import React, { useState } from "react";
import {
  IonAlert,
  IonAvatar,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Result, Layout, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import NurseryCalendarContainer from "../calendar/NurseryCalendarContainer";
import JournalContainer from "../journal/JournalContainer";
import CarerListContainer from "../carers/CarerListContainer";
import ChildListContainer from "../children/ChildListContainer";
import StaffListContainer from "../staff/StaffListContainer";

import "../../style.css";
import LogoutContainer from "../../../common/LogoutContainer";

// displays the dashboard for nursery users (admin and staff)
const NurseryDashboard = ({
  currentUser,
  deactivated,
  handleDeactivate,
  nursery,
  setShowConfirmModal,
  showConfirmModal,
}) => {
  const [journalChild, setJournalChild] = useState(null);
  const [activeItem, setActiveItem] = useState("children");

  const nurseryId = nursery.id;

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
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
              <IonLabel>
                {currentUser.firstName} {currentUser.surname}
              </IonLabel>
            </IonChip>
            {/*display a side menu*/}
            <IonItem onClick={() => setActiveItem("children")}>
              Children
            </IonItem>
            <IonItem onClick={() => setActiveItem("staff")}>Staff</IonItem>
            <IonItem onClick={() => setActiveItem("carers")}>Carers</IonItem>
            <IonItem onClick={() => setActiveItem("calendar")}>
              Calendar
            </IonItem>
            {/*only admins have the option to deactivate the nursery account*/}
            {currentUser.role === "admin" && (
              <IonItem onClick={() => setShowConfirmModal(true)}>
                <b>Deactivate this account</b>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="my-content"></IonRouterOutlet>
      {/*render main page with off-white background colour*/}
      <div
        className="ion-page"
        id="main-content"
        style={{ color: "rgb(240, 242, 245)" }}
      >
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButtons slot="primary">
              <LogoutContainer />
            </IonButtons>
            <IonTitle>{`${nursery.name} Staff Dashboard`}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/*if user clicked on deactivate account menu item, show confirmation alert*/}
        {showConfirmModal && (
          <IonAlert
            isOpen={showConfirmModal}
            onDidDismiss={() => setShowConfirmModal(false)}
            header={`Confirm deactivation`}
            message={`Do you want to deactivate your account? You will have 90 days to reactivate your account before the data is permanently deleted`}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
              },
              {
                text: "Deactivate",
                handler: () => {
                  handleDeactivate();
                },
              },
            ]}
          />
        )}

        {/*if the nursery is still active, show the dashboard content*/}
        {!deactivated && (
          <IonContent>
            <Layout>
              {/*if children menu item is selected, render the list of children associated with the nursery*/}
              {activeItem === "children" && (
                <Row>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <ChildListContainer
                      userId={currentUser.userId}
                      nurseryId={nurseryId}
                      showJournal={(child) => setJournalChild(child)}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    {/*if a child is selected, render the journal view*/}
                    {journalChild ? (
                      <JournalContainer
                        children={[journalChild]}
                        role={currentUser.role}
                      />
                    ) : (
                      // if no child is selected, prompt the user to add or select a child
                      <Result
                        icon={<SmileOutlined color={"#e87ad0"} />}
                        title="Please add or select a child to get started."
                      />
                    )}
                  </Col>
                </Row>
              )}

              {/*if carers menu item is selected, show list of carers associated with the nursery*/}
              {activeItem === "carers" && (
                <CarerListContainer nurseryId={nursery.id} />
              )}

              {/*if staff menu item is selected, show list of staff associated with the nursery*/}
              {activeItem === "staff" && (
                <StaffListContainer nurseryId={nursery.id} />
              )}

              {/*if calendar menu is selected, show calendar (not implemented)*/}
              {activeItem === "calendar" && (
                <NurseryCalendarContainer
                  nurseryName={nursery.name}
                  nurseryId={nursery.id}
                />
              )}
            </Layout>
          </IonContent>
        )}

        {/*if nursery was deactivated, do not show any content*/}
        {deactivated && <h1>DEACTIVATED</h1>}
      </div>
    </div>
  );
};

export default NurseryDashboard;
