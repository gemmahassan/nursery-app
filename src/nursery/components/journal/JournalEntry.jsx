import React, {useEffect, useState} from "react";
import moment from 'moment';
import EditEntry from "./EditEntry";
import {EditOutlined} from "@ant-design/icons";
import ChildDataService from "../../../services/child";
import {Image} from "antd";

const JournalEntry = ({entry, role}) => {
  const {child_id, first_name, id, image, surname, text, timestamp, type, type_id, user_id} = entry;
  const time = moment(timestamp).format('h:mma');

  const [showEditModal, setShowEditModal] = useState(false);
  const [child, setChild] = useState({});

  const getChild = () => {
    ChildDataService.getById(child_id)
      .then(response => {
        setChild(response.data);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getChild();
  }, []);

  return (
    <>
      <h2>
        {`${time} - ${type}`}

        {role !== "carer" &&
        <EditOutlined
          onClick={() => setShowEditModal(!showEditModal)}
        />
        }
      </h2>

      {image &&
      <Image src={image}/>
      }
      <p>{text}</p>
      <p>Added by {first_name} {surname}</p>

      {showEditModal &&
      <EditEntry
        showEditModal={showEditModal}
        hideEditModal={() => setShowEditModal(false)}
        child={child}
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