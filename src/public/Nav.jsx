import React from "react";
import { Link } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { HomeTwoTone } from "@ant-design/icons";

const Nav = () => {
  return (
    <IonHeader>
      <IonToolbar color={"tertiary"}>
        <h4 className={"title"}>
          <Link to="/">Nursery Journal</Link>
        </h4>
        <Link to="/">
          <HomeTwoTone twoToneColor="#ce72e8" className={"home"} />
        </Link>
        <IonButtons slot="primary">
          <IonButton>
            <Link to="/nurseries">Nurseries</Link>
          </IonButton>
          <IonButton>
            <Link to="/contact">Contact Us</Link>
          </IonButton>
          <IonButton>
            <Link to="/login">Login</Link>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Nav;
