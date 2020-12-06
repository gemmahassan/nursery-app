import React from "react";
import history from "../history";
import { IonButton } from "@ionic/react";

const Home = () => {
  return <IonButton onClick={() => history.push("/staff")}>Staff</IonButton>;
};

export default Home;
