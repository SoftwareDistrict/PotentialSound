import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Grid,
  GridList,
  GridListTile,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import { profileStyle } from "../styles/styles.js";
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

  const classes = profileStyle();

  return (
    <div>
      <Appbar currentUser={currentUser} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Container className={classes.container}>
          {/* <Avatar alt={username} src={propic} className={classes.avatar} /> */}
          {youTube ? (
            <a href={youTube}>
              <FontAwesomeIcon color="red" icon={faYoutube} />
            </a>
          ) : null}
          {instagram ? (
            <a href={instagram}>
              <FontAwesomeIcon color="#e4405f" icon={faInstagram} />
            </a>
          ) : null}
          {soundCloud ? (
            <a href={soundCloud}>
              <FontAwesomeIcon color="orange" icon={faSoundcloud} />
            </a>
          ) : null}
          {facebook ? (
            <a href={facebook}>
              <FontAwesomeIcon color="blue" icon={faFacebook} />
            </a>
          ) : null}
          <div>
            <Typography variant="h3" align="center">
              {username}
            </Typography>
            <Avatar alt={username} src={propic} className={classes.avatar} />
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
        </Container>
        <Link to="/updateProfile">
          <Button className={classes.button}>Update Profile</Button>
        </Link>
        <div>
          {InstaPosts[0] ? (
            <div className={classes.root}>
              <GridList cols={2}>
                <GridListTile>
                  <img src={InstaPosts[0].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={InstaPosts[1].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={InstaPosts[2].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={InstaPosts[3].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={InstaPosts[4].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={InstaPosts[5].imageUrl} />
                </GridListTile>
              </GridList>
            </div>
          ) : null}
        </div>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
