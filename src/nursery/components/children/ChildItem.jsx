import React from "react";
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from "@ionic/react";

const ChildItem = ({id, firstName, image, surname}) => {

  return (
    <li key={id}>
      <IonCard style={{borderRadius: '25px'}}>
        <IonCardHeader>
          <IonCardTitle>{`${firstName} ${surname}`}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <img src={`${image}`} alt="child" ></img>
          </IonCardContent>
      </IonCard>
    </li>
  );
}

{/*<IonButton*/}
{/*  onClick={() => history.push(`/child/${id}/journal/${today}`, { firstName })}>*/}
{/*  {`${firstName} ${surname}`}*/}
{/*</IonButton>*/}
export default ChildItem;