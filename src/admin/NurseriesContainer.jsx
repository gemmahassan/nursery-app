import React, { useEffect, useState } from "react";
import NurseryDataService from "../services/nursery";
import Nurseries from "./Nurseries";

const NurseriesContainer = () => {
  const [nurseries, setNurseries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentNursery, setCurrentNursery] = useState({});
  const [removeSuccess, setRemoveSuccess] = useState(false);

  // call API to get confirmed nurseries only
  // save in nurseries array
  const getConfirmedNurseries = () => {
    NurseryDataService.getAllConfirmed()
      .then((response) => setNurseries(response.data))
      .catch((e) => console.log(e));
  };

  // handle click of close button, save current state
  const handleClick = (nursery) => {
    setCurrentNursery(nursery);
    setShowConfirm(true);
  };

  // call API to set deleted timestamp
  const handleRemove = () => {
    NurseryDataService.delete(currentNursery.id)
      .then(() => setRemoveSuccess(true))
      .catch((e) => console.log(e));
  };

  // get a list of confirmed nurseries each time the page re-renders
  useEffect(() => {
    getConfirmedNurseries();
  }, []);

  // if a nursery is declined, get the list again
  useEffect(() => {
    if (removeSuccess) {
      getConfirmedNurseries();
    }
  }, [removeSuccess]);

  // render Nurseries component
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
