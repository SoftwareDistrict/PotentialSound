import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";

const UpdateProfile = ({ currentUser, menu }) => {
  const [newUser, setNewUser] = useState("Previous Username");
  const [newCity, setNewCity] = useState("Previous City");
  const [newCell, setNewCell] = useState("Previous Cell");
  const [newDescription, setNewDescription] = useState("Previous Description");
  const [photo, setPhoto] = useState([]);

  const onDrop = (picture) => {
    setPhoto(photo.concat(picture));
  };

  const uploadImg = () => {
    let data = new FormData();

    data.append("image", photo[0], photo[0].name);

    axios
      .post("/api/uploadImageUpdate", data)
      .then(({ data }) => console.info(data))
      .catch((err) => console.warn(err));
  };

  const updateProfile = () => {
    uploadImg();

    axios
      .put("/updateProfile", {
        username: newUser,
        city: newCity,
        cell: newCell,
        description: newDescription,
      })
      .then(({ data }) => console.info(data))
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      {menu}
      <h1>Update Your Profile</h1>
      <input
        style={{ marginBottom: "10px" }}
        value={newUser}
        onChange={(e) => {
          setNewUser(e.target.value);
        }}
      ></input>
      <input
        style={{ marginBottom: "10px" }}
        value={newCity}
        onChange={(e) => {
          setNewCity(e.target.value);
        }}
      ></input>
      <input
        style={{ marginBottom: "10px" }}
        value={newCell}
        onChange={(e) => {
          setNewCell(e.target.value);
        }}
      ></input>
      <input
        style={{ marginBottom: "10px" }}
        value={newDescription}
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
      ></input>
      <ImageUploader
        withIcon={false}
        withPreview={true}
        singleImage={true}
        buttonText="Select Image"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
      <Link to={`/profile/${currentUser.id}`} style={{ marginTop: "30px" }}>
        <button style={{ backgroundColor: "orange" }} type="button" onClick={() => updateProfile()}>
          Submit Change
        </button>
      </Link>
    </div>
  );
};

UpdateProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  menu: PropTypes.element,
};

export default UpdateProfile;
