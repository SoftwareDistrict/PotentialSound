import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "regenerator-runtime/runtime";

const ViewProfile = ({ match, menu }) => {
  const username = match.params.name;
  useEffect(() => {
    getUser();
  }, []);
  const [proInfo, setInfo] = useState({});
  const getUser = async () => {
    const data = await axios.get(`/viewprofile/${username}`);
    setInfo(data.data);
  };

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
          Email: {proInfo.email}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Cell Phone Number: {proInfo.cell}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Hometown: {proInfo.city}
        </div>
        <div style={{ marginBottom: "10px" }} className="ViewProfile">
          Description: {proInfo.description}
        </div>
        <div>
          {proInfo.youTube ? (
            <a href={proInfo.youTube}>
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          ) : null}
          {proInfo.instagram ? (
            <a href={proInfo.instagram}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          ) : null}
          {proInfo.soundCloud ? (
            <a href={proInfo.soundCloud}>
              <FontAwesomeIcon icon={faSoundcloud} />
            </a>
          ) : null}
          {proInfo.facebook ? (
            <a href={proInfo.facebook}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          ) : null}
        </div>
      </div>
      <div
        className="ViewProfile"
        style={{ margin: "0 auto", textAlign: "center", fontSize: "125%" }}
      >
        Profile Picture
        <img src={proInfo.propic} />
      </div>
    </div>
  );
};
ViewProfile.propTypes = {
  menu: PropTypes.element,
  match: PropTypes.string.isRequired,
};
export default ViewProfile;
