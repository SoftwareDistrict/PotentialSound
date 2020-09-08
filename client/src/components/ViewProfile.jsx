import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "regenerator-runtime/runtime";
const ViewProfile = ({ username, menu }) => {
  console.info(username, "this is the propppp");
  const [proInfo, setInfo] = useState([]);
  useEffect(async () => {
    const data = await axios.get(`/viewProfile/${username}`);
    console.info(data.data, " data from axios request");
    const { city, email, description, cell, propic } = data.data;
    setInfo([city, email, description, cell, propic]);
    console.info(proInfo, "seeing if info got updated");
  }, []);
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
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Username: {username}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Email: {proInfo[1]}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Cell Phone Number: {proInfo[3]}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Hometown: {proInfo[0]}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Description: {proInfo[2]}
        </div>
      </div>
      <div
        className="ViewProfile"
        style={{ margin: "0 auto", textAlign: "center", fontSize: "125%" }}
      >
        Profile Picture
        <img src={proInfo[4]} />
      </div>
    </div>
  );
};
ViewProfile.propTypes = {
  menu: PropTypes.element,
  username: PropTypes.string.isRequired,
};
export default ViewProfile;
