import React from "react";
import history from "../history";
import {
  IonToolbar,
  IonTitle,
  IonPage,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import {personCircle, search, helpCircle, star, create, ellipsisHorizontal, ellipsisVertical} from 'ionicons/icons';

const Home = () => {
  return (
    <ion-header>
      {/*<IonToolbar>*/}
      {/*  <IonTitle>Nursery Journal</IonTitle>*/}
      {/*</IonToolbar>*/}
      {/*<IonToolbar>*/}
      {/*  <IonButtons slot="secondary">*/}
      {/*    <IonButton>*/}
      {/*      <IonIcon slot="icon-only" icon={personCircle}/>*/}
      {/*    </IonButton>*/}
      {/*    <IonButton>*/}
      {/*      <IonIcon slot="icon-only" icon={search}/>*/}
      {/*    </IonButton>*/}
      {/*  </IonButtons>*/}
      {/*  <IonButtons slot="primary">*/}
      {/*    <IonButton color="secondary">*/}
      {/*      <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}/>*/}
      {/*    </IonButton>*/}
      {/*  </IonButtons>*/}
      {/*  <IonTitle>Default Buttons</IonTitle>*/}
      {/*</IonToolbar>*/}

      <IonToolbar>
        <IonButtons slot="secondary">
          <IonButton onClick={() => history.push('/nurseries')}>Our Nurseries</IonButton>
        </IonButtons>
        {/*<IonButtons slot="primary">*/}
        {/*  <IonButton color="danger">Edit</IonButton>*/}
        {/*</IonButtons>*/}
        <IonTitle>NURSERY JOURNAL</IonTitle>
      </IonToolbar>

    </ion-header>
    // <IonPage>
    //   <IonContent>
    //     <IonButton onClick={() => history.push("/staff")}>Staff</IonButton>
    //     <IonButton onClick={() => history.push("/nurseries")}>
    //       Nurseries
    //     </IonButton>
    //     <IonButton onClick={() => history.push("/staff/nursery/5fc10de6c48f2a23514b9ed1")}>
    //       Cats Nursery Staff
    //     </IonButton>
    //   </IonContent>
    // </IonPage>
  );
};

export default Home;
