import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Profile = ({ menu, currentUser }) => {
  const { username, cell, city, email } = currentUser;

  return (
    <div>
      {menu}
      <h1 style={{ textAlign: "center" }}>{`${username}'s Profile Information`}</h1>
      <div
        id="profile"
        style={{
          border: "2px solid black",
          width: "350px",
          height: "300px",
          textAlign: "center",
          fontSize: "20px",
          margin: "0 auto",
          color: "orange",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
            top: "165px",
            left: "120px",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src="https://ca.slack-edge.com/T02P3HQD6-UQ9RMQ67J-8c62ecbaf341-512"
            alt="Avatar"
            style={{
              display: "inline",
              margin: "0 auto",
              marginLeft: "-25%",
              height: "100%",
              width: "auto",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px", marginTop: "175px" }} className="profileInfo">
          Username: {username}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Email: {email}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Cell Phone Number: {cell}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Based Our Of: {city}
        </div>
      </div>
      <Link to="/updateProfile">
        <button style={{ backgroundColor: "orange" }} type="button">
          Update Profile
        </button>
      </Link>
    </div>
  );
};

Profile.propTypes = {
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
