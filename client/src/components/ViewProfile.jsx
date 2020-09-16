import React, { useState, useEffect } from "react";
import Appbar from "./Appbar.jsx";
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

const ViewProfile = ({ match, currentUser }) => {
  const username = match.params.name;
  useEffect(() => {
    getUser();
  }, []);
  const [proInfo, setInfo] = useState({});
  const [instaPic, setInstaPic] = useState([]);
  const getUser = async () => {
    const data = await axios.get(`/viewOtherProfiles/${username}`);
    if (data.data[0]) {
      setInfo(data.data[0]);
      setInstaPic(data.data[1]);
    } else {
      setInfo(data.data);
    }
  };

  return (
    <div>
      <Appbar currentUser={currentUser} />
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
              <FontAwesomeIcon color="red" icon={faYoutube} />
            </a>
          ) : null}
          {proInfo.instagram ? (
            <a href={proInfo.instagram}>
              <FontAwesomeIcon color="#e4405f" icon={faInstagram} />
            </a>
          ) : null}
          {proInfo.soundCloud ? (
            <a href={proInfo.soundCloud}>
              <FontAwesomeIcon color="red" icon={faSoundcloud} />
            </a>
          ) : null}
          {proInfo.facebook ? (
            <a href={proInfo.facebook}>
              <FontAwesomeIcon color="blue" icon={faFacebook} />
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
      <div>
        {instaPic[0] ? (
          <div>
            <img src={instaPic[0].imageUrl} />
            <img src={instaPic[1].imageUrl} />
            <img src={instaPic[2].imageUrl} />
            <img src={instaPic[3].imageUrl} />
            <img src={instaPic[4].imageUrl} />
            <img src={instaPic[5].imageUrl} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
ViewProfile.propTypes = {
  match: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
};
export default ViewProfile;
