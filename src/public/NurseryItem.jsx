import React from "react";
import history from "../history";
import {IonButton} from "@ionic/react";

const NurseryItem = ({id, name }) => {
  return (
    <li key={id}>
      <IonButton
        onClick={() => history.push(`nurseries/${id}`)}>
        {name}
      </IonButton>
    </li>
  );
};

export default NurseryItem;
