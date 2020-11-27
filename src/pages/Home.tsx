import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import NurseryStaff from "../staff/pages/NurseryStaff";

const Home: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={NurseryStaff} />
    </IonRouterOutlet>
  );
};

export default Home;
