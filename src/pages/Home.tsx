import React from "react";
import history from "../history";
import { IonButton, IonContent, IonPage } from "@ionic/react";

const Home = () => {
  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => history.push("/staff")}>Staff</IonButton>
        <IonButton onClick={() => history.push("/nurseries")}>
          Nurseries
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
