import React, { useEffect, useState } from "react";
import NurseryDataService from "../../services/nursery";
import NurseryList from "./NurseryList";

const NurseryListContainer = () => {
  const [nurseries, setNurseries] = useState([]);

  // call API to get all confirmed nurseries
  const getNurseries = () => {
    NurseryDataService.getAllConfirmed()
      .then((response) => setNurseries(response.data))
      .catch((e) => console.log(e));
  };

  // get list of nurseries on page render
  useEffect(() => {
    getNurseries();
  }, []);

  return <NurseryList nurseries={nurseries} />;
};

export default NurseryListContainer;
