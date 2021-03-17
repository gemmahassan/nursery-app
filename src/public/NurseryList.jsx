import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';

import NurseryItem from "./NurseryItem";

const NurseryList = () => {
  const [nurseries, setNurseries] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    getNurseries();
  }, []);

  const getNurseries = () => {
    NurseryDataService.getAll()
      .then(response => {
        setNurseries(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ul>
      {nurseries && nurseries.map(nursery => (
        <li key={nursery.id}>
          <NurseryItem
            id={nursery.id}
            name={nursery.name}
          />
        </li>
      ))}
    </ul>
  );
};

export default NurseryList;
