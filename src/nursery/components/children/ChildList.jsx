import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import NurseryDataService from '../../../services/nursery-service';
import ChildItem from "./ChildItem";

const ChildList = () => {
  const { nurseryId } = useParams();
  const [children, setChildren] = useState([]);
  const [currentNursery, setCurrentNursery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = () => {
    NurseryDataService.getChildren(nurseryId)
      .then(response => {
        setChildren(response.data);
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
      {children && children.map(child => (
        <ChildItem
          id={child.id}
          firstName={child.first_name}
          surname={child.surname}
        />
      ))}
    </ul>
  );
};

export default ChildList;