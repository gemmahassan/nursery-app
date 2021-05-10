import React, {useEffect, useState} from "react";
import NurseryDataService from '../../../services/nursery';
import AuthService from '../../../services/auth';
import ChildList from "./ChildList";

//This component renders a list of children
const ChildListContainer = ({nurseryId, userId, showJournal}) => {
    const [children, setChildren] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddChildModal, setShowAddChildModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [journalData, setJournalData] = useState(null);
    const [childData, setChildData] = useState(null);

    // get the current user's details from the auth token
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
      if (nurseryId) {
        getChildren();
      }
    }, [nurseryId]);

    // get all children associated with the current nursery
    const getChildren = () => {
      NurseryDataService.getChildren(nurseryId)
        .then(response => setChildren(response.data))
        .catch(e => console.log(e));
    };

    return (
      <ChildList
        childData={childData}
        children={children}
        currentUser={currentUser}
        getChildren={getChildren}
        journalData={journalData}
        setChildData={setChildData}
        setJournalData={setJournalData}
        setShowAddChildModal={setShowAddChildModal}
        setShowAddModal={setShowAddModal}
        setShowEditModal={setShowEditModal}
        showAddModal={showAddModal}
        showAddChildModal={showAddChildModal}
        showEditModal={showEditModal}
        showJournal={showJournal}
        userId={userId}
      />
    );
  }
;

export default ChildListContainer;