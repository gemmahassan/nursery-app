import React, {useState} from "react";
import { IonContent, IonInput, IonItem, IonLabel, IonList} from '@ionic/react';

const NurserySignup = () => {
  const [nurseryName, setNurseryName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [firstLine, setFirstLine] = useState('');
  const [town, setTown] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <IonContent>
      Please enter your nursery's details below. You will then receive an email with details on how to set up your account.
      <IonList>
        <IonLabel>Name of Nursery</IonLabel>
        <IonItem>
          <IonInput
            value={nurseryName}
            onIonChange={e => setNurseryName(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>

        <IonLabel>Contact Name</IonLabel>
        <IonItem>
          <IonInput
            value={contactName}
            onIonChange={e => setContactName(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>

        <IonLabel>Email</IonLabel>
        <IonItem>
          <IonInput
            value={email}
            inputmode={email}
            onIonChange={e => setEmail(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>

        <IonLabel>Address</IonLabel>
        <IonItem>
          <IonInput
            value={firstLine}
            placeholder="First Line"
            onIonChange={e => setFirstLine(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={town}
            placeholder="Town"
            onIonChange={e => setTown(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={county}
            placeholder="County"
            onIonChange={e => setCounty(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={postcode}
            placeholder="Postcode"
            onIonChange={e => setPostcode(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>

        <IonLabel>Phone</IonLabel>
        <IonItem>
          <IonInput
            value={phone}
            onIonChange={e => setPhone(e.detail.value)}
            required
            clearInput>
          </IonInput>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default NurserySignup;
