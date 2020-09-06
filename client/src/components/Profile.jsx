import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Profile = ({ menu, currentUser }) => {
  const { username, propic, cell, city, email } = currentUser;

  return (
    <div>
      {menu}
      <h1 style={{ textAlign: "center" }}>{`${username}'s Profile Information`}</h1>
      <div
        id="profile"
        style={{
          border: "2px solid black",
          width: "500px",
          height: "200px",
          textAlign: "center",
          fontSize: "125%",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Username: {username}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Email: {email}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Cell Phone Number: {cell}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Hometown: {city}
        </div>
      </div>
      <div
        className="profileInfo"
        style={{ margin: "0 auto", textAlign: "center", fontSize: "125%" }}
      >
        Profile Picture
        <img src={propic} />
      </div>
      <Link to="/updateProfile">
        <button type="button">Update Profile</button>
      </Link>
    </div>
  );
};

Profile.propTypes = {
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
