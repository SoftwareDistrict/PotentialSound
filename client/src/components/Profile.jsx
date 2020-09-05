import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Profile = ({ match, users, menu, currentUser }) => {
  const [user, setUser] = useState("");
  const [myProfile, setMyProfile] = useState(false);

  users.forEach((user) => {
    if (user.id === match.params.id) {
      setUser(user);
    }
  });

  if (user === currentUser) {
    setMyProfile(true);
  }

  useEffect(() => {
    users.forEach((user) => {
      if (user.id === match.params.id) {
        setUser(user);
        if (user === currentUser) {
          setMyProfile(true);
        }
      }
    });
  }, [users]);

  const { username, propic, cell, city, email } = user;

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
        <div className="profileInfo">Username: {username}</div>
        <br />
        <div className="profileInfo">Email: {email}</div>
        <br />
        <div className="profileInfo">Cell Phone Number: {cell}</div>
        <br />
        <div className="profileInfo">Hometown: {city}</div>
        <br />
      </div>
      <div
        className="profileInfo"
        style={{ margin: "0 auto", textAlign: "center", fontSize: "125%" }}
      >
        Profile Picture
        <img src={propic} />
      </div>
      {myProfile ? (
        <Link to="/updateProfile">
          <button type="button">Update Profile</button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
