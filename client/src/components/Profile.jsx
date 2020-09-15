import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "regenerator-runtime/runtime";

const Profile = ({ currentUser }) => {
  const {
    username,
    propic,
    cell,
    city,
    email,
    description,
    youTube,
    instagram,
    soundCloud,
    facebook,
    instaHandle,
  } = currentUser;
  const useStyles = makeStyles({
    avatar: {
      width: "120px",
      height: "120px",
      position: "absolute",
      top: "50px",
      left: "25px",
      variant: "circle",
    },
  });
  useEffect(() => {
    getInstaPosts();
  }, [instaHandle]);
  const [InstaPosts, setInstaPosts] = useState([]);
  const getInstaPosts = async () => {
    if (instaHandle) {
      const posts = await axios.get(`/instagram/${instaHandle}`);
      setInstaPosts(posts.data);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Appbar />
      <Avatar alt={username} src={propic} className={classes.avatar} />
      <h1 style={{ textAlign: "right", marginTop: "80px" }}>{username}</h1>
      {youTube ? (
        <a href={youTube}>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      ) : null}
      {instagram ? (
        <a href={instagram}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      ) : null}
      {soundCloud ? (
        <a href={soundCloud}>
          <FontAwesomeIcon icon={faSoundcloud} />
        </a>
      ) : null}
      {facebook ? (
        <a href={facebook}>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      ) : null}
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
      <div>
        {InstaPosts[0] ? (
          <div>
            <img src={InstaPosts[0].imageUrl} />
            <img src={InstaPosts[1].imageUrl} />
            <img src={InstaPosts[2].imageUrl} />
            <img src={InstaPosts[3].imageUrl} />
            <img src={InstaPosts[4].imageUrl} />
            <img src={InstaPosts[5].imageUrl} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
