import React from "react";
import { useHistory } from "react-router-dom";
import {IonButton} from "@ionic/react";

const ChildItem = ({id, firstName, surname}) => {
  const history = useHistory();

  return (
    <li key={id}>
      <IonButton
        onClick={() => history.push(`/child/${id}/journal`, { firstName })}>
        {`${firstName} ${surname}`}
      </IonButton>
    </li>
  );
}

export default ChildItem;