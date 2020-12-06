import React, { useEffect, useState } from "react";

import NurseryItem from "./NurseryItem";

const NurseryList = () => {
  const [loadedNursery, setLoadedNursery] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/nursery"
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setLoadedNursery(responseData.nurseries);
      } catch (err) {}
    };
    sendRequest();
  }, []);

  if (loadedNursery.length === 0) {
    return <h2>No nurseries found</h2>;
  }

  return (
    <ul>
      {loadedNursery.map((nursery) => (
        <NurseryItem
          key={nursery.id}
          id={nursery.id}
          imageUrl={nursery.imageUrl}
          name={nursery.name}
          address={nursery.address}
          town={nursery.town}
          staff={nursery.staff}
        />
      ))}
    </ul>
  );
};

export default NurseryList;
