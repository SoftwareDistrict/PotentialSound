import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Profile = ({ menu, currentUser }) => {
  const { username, cell, city, email, description } = currentUser;

  return (
    <div>
      {menu}
      <div
        style={{
          width: "120px",
          height: "120px",
          position: "absolute",
          top: "50px",
          left: "25px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <img
          src="https://tinyurl.com/y3mgbqoa"
          alt="Avatar"
          style={{
            display: "inline-flex",
            margin: "0 auto",
            height: "100%",
            width: "auto",
          }}
        />
      </div>
      <h1 style={{ textAlign: "right", marginTop: "80px"  }}>{username}</h1>
      <div
        id="profile"
        style={{
          border: "2px solid black",
          width: "350px",
          height: "300px",
          textAlign: "left",
          fontSize: "20px",
          margin: "0 auto",
          color: "orange",
        }}
      >
        <div style={{ marginBottom: "10px", marginTop: "25px" }} className="profileInfo">
          Email: {email}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Cell Phone Number: {cell}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Based Out Of: {city}
        </div>
        <div style={{ marginBottom: "10px" }} className="profileInfo">
          Description: {description}
        </div>
      </div>
      <Link to="/updateProfile">
        <button style={{ backgroundColor: "#eb8c34", marginTop: "10px" }} type="button">
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
