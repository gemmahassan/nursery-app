import React, {useState} from "react";
import moment from 'moment';
import {IonAlert, IonButton, IonContent, IonImg, IonModal} from '@ionic/react';
import EditEntry from "./EditEntry";
import {EditOutlined} from "@ant-design/icons";

const JournalEntry = ({entry, role}) => {
  const {child_id, first_name, id, image, surname, text, timestamp, type, type_id, user_id} = entry;
  const time = moment(timestamp).format('h:mma');

  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <h2>
        {`${time} - ${type}`}

        {role !== "carer" &&
        <EditOutlined
          onClick={() => setShowEditModal(true)}
        />
        }
      </h2>

      {image &&
      <IonImg src={image}/>
      }
      <p>{text}</p>
      <p>Added by {first_name} {surname}</p>

      {showEditModal &&
      <EditEntry
        showEditModal={showEditModal}
        childId={child_id}
        journalId={id}
        image={image}
        userId={user_id}
        text={text}
        timestamp={timestamp}
        type={type}
        typeId={type_id}
      />
      }
    </>
  );
}

export default JournalEntry;