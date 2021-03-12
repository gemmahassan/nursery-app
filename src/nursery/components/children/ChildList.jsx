import React, {useEffect, useState} from "react";
import NurseryDataService from '../../../services/nursery';
import ChildItem from "./ChildItem";

const ChildList = ({nurseryId}) => {
  const [children, setChildren] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (nurseryId) {
      getChildren();
    }
  }, [nurseryId]);

  const getChildren = () => {
    console.log(nurseryId);
    NurseryDataService.getChildren(nurseryId)
      .then(response => {
        setChildren(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ul>
      {children && children.map(child => (
        <ChildItem
          id={child.id}
          firstName={child.first_name}
          surname={child.surname}
          image={child.image}
        />
      ))}
    </ul>
  );
};

export default ChildList;