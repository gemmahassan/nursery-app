import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import StaffList from "../staff/components/StaffList";

const Home: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={StaffList} />
    </IonRouterOutlet>
  );
};

export default Home;
