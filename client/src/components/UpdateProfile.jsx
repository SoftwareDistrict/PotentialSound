import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateProfile = ({ userName }) => {
  const [newUser, setNewUser] = useState("Previous Username");
  const [newCity, setNewCity] = useState("Previous City");
  const [newCell, setNewCell] = useState("Previous Cell");
  const [newDescription, setNewDescription] = useState("Previous Description");

  const updateProfile = () => {
    axios.put("/updateProfile", {
      userName: newUser,
      city: newCity,
      cell: newCell,
      description: newDescription,
    })
      .then(({ data }) => console.info(data))
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <h1>Update Your Profile</h1>
      <input
        value={newUser}
        onChange={(e) => {
          setNewUser(e.target.value);
        }}
      ></input>
      <br />
      <input
        value={newCity}
        onChange={(e) => {
          setNewCity(e.target.value);
        }}
      ></input>
      <br />
      <input
        value={newCell}
        onChange={(e) => {
          setNewCell(e.target.value);
        }}
      ></input>
      <br />
      <input
        value={newDescription}
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
      ></input>
      <br />
      <Link to={`/profile/${userName}`}>
        <button type="button" onClick={() => updateProfile()}>
          Submit Change
        </button>
      </Link>
    </div>
  );
};

UpdateProfile.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default UpdateProfile;
