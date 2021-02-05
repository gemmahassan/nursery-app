import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child-service";
import {useParams} from "react-router-dom";

const Journal = () => {
  const { childId } = useParams();
  const [journal, setJournal] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    getJournal();
  }, []);

  const getJournal = () => {
    ChildDataService.getJournal(childId)
      .then(response => {
        setJournal(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  //
  // const refreshList = () => {
  //   getNurseries();
  //   setCurrentNursery(null);
  //   setCurrentIndex(-1);
  // };

  // const setActiveNursery = (nursery, index) = {
  //   setCurrentNursery(nursery);
  //   setCurrentIndex(index);
  // };

  return (
    <ul>
      {journal && journal.map(entry => (
        // <NurseryItem
        //   key={nursery.id}
        //   id={nursery.id}
        //   name={nursery.name}
        //   address={nursery.address}
        // />
        <li key={entry.id}>
          {entry.text}
        </li>
      ))}
    </ul>
  );
}

export default Journal;