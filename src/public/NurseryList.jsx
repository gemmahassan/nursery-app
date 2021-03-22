import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonMenuButton, IonAvatar, IonLabel, IonChip
} from "@ionic/react";
import NurseryItem from "./NurseryItem";

const NurseryList = () => {
  const [nurseries, setNurseries] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    getNurseries();
  }, []);

  const getNurseries = () => {
    NurseryDataService.getAllConfirmed()
      .then(response => {
        setNurseries(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <IonContent>
      <ul>
        {nurseries && nurseries.map(nursery => (
          <li key={nursery.id}>
            <NurseryItem
              id={nursery.id}
              image={nursery.image}
              name={nursery.name}
            />
          </li>
        ))}
      </ul>
    </IonContent>

  );
};

export default NurseryList;
