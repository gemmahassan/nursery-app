import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';
import Nurseries from "./Nurseries";

const NurseriesContainer = () => {
  const [nurseries, setNurseries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentNursery, setCurrentNursery] = useState({});

  useEffect(() => {
    NurseryDataService.getAllConfirmed()
      .then(response => setNurseries(response.data))
      .catch(e => console.log(e));
  }, []);

  const handleClick = nursery => {
    setCurrentNursery(nursery);
    setShowConfirm(true);
  };

  const handleRemove = () => {
    NurseryDataService.delete(currentNursery.id)
      .then(
        response => console.log(response.data))
      .catch(e => console.log(e));
  };

  return (
    <Nurseries
      handleClick={handleClick}
      handleRemove={handleRemove}
      nurseries={nurseries}
      setShowConfirm={setShowConfirm}
      showConfirm={showConfirm}
    />
  );
};

export default NurseriesContainer;
