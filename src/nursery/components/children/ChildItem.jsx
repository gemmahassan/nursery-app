import React from "react";
import history from "../../../history";
import {IonButton} from "@ionic/react";


const ChildItem = props => {
  return (
    <li key={props.id}>
      <IonButton
        onClick={() => history.push(`/child/${props.id}/journal`)}>
        {`${props.firstName} ${props.lastName}`}
      </IonButton>
    </li>
  );
}

export default ChildItem;