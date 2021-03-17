import React from "react";
import history from "../history";
import {IonButton} from "@ionic/react";

const NurseryItem = ({id, image, name }) => {
  return (
    <li key={id}>
      <IonButton
        onClick={() => history.push(`nurseries/${id}`)}>
        <img src={image} alt="nursery"/>
        {name}
      </IonButton>
    </li>
  );
};

export default NurseryItem;
