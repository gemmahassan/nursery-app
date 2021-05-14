import React, { useState } from "react";
import NurseryDataService from "../../services/nursery";
import { debounce } from "throttle-debounce";
import "../styles.css";
import NurseryContact from "./NurseryContact";

const NurseryContactContainer = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const apiKey = "aDUOicMHl0-6XpwvlhUH4w30713";

  const colors = [
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#00bcd4",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ff9800",
    "#607d8b",
  ];

  // call the postcodes API 1 second after user finishes typing
  // set latitude and longitude with data from the response
  const handlePostcodeChange = debounce(1000, (value) => {
    fetch(`https://api.getAddress.io/find/${value}?api-key=${apiKey}`)
      .then((res) => res.json())
      .then((response) => {
        setLatitude(response.latitude);
        setLongitude(response.longitude);
      })
      .catch((e) => console.log(e));
  });

  // store all the form data and pass to the server
  const handleSignup = ({
    name,
    contactFirstName,
    contactSurname,
    email,
    phone,
    addressLine1,
    addressLine2,
    town,
    county,
    postcode,
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contact_first_name", contactFirstName);
    formData.append("contact_surname", contactSurname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("addressLine1", addressLine1);
    formData.append("addressLine2", addressLine2);
    formData.append("town", town);
    formData.append("county", county);
    formData.append("postcode", postcode);
    formData.append("color", color);
    formData.append("image", image, image.name);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    NurseryDataService.contact(formData)
      .then(() => setShowSuccess(true))
      .catch((e) => console.log(e));
  };

  return (
    <NurseryContact
      colors={colors}
      handlePostcodeChange={handlePostcodeChange}
      handleSignup={handleSignup}
      setColor={setColor}
      setImage={setImage}
      showSuccess={showSuccess}
    />
  );
};

export default NurseryContactContainer;
