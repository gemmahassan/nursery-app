import React from "react";
import { useHistory } from "react-router-dom";
import {IonButton} from "@ionic/react";
import moment from "moment";

const ChildItem = ({id, firstName, surname}) => {
  const history = useHistory();

  const today = moment().format("YYYY-MM-DD");

  return (
    <li key={id}>
      <IonButton
        onClick={() => history.push(`/child/${id}/journal/${today}`, { firstName })}>
        {`${firstName} ${surname}`}
      </IonButton>
    </li>
  );
}

export default ChildItem;