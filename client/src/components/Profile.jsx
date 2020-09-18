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
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        className={classes.mainContainer}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Container className={classes.container}>
            <div>
              <Typography variant="h3" align="center" className={classes.username}>
                {username}
              </Typography>
              <Avatar alt={username} src={propic} className={classes.avatar} />
              {youTube ? (
                <a href={youTube} >
                  <FontAwesomeIcon color="red" icon={faYoutube} size="lg" />
                </a>
              ) : null}
              {instagram ? (
                <a href={instagram}>
                  <FontAwesomeIcon color="#e4405f" icon={faInstagram} size="lg" />
                </a>
              ) : null}
              {soundCloud ? (
                <a href={soundCloud}>
                  <FontAwesomeIcon color="orange" icon={faSoundcloud} size="lg" />
                </a>
              ) : null}
              {facebook ? (
                <a href={facebook}>
                  <FontAwesomeIcon color="blue" icon={faFacebook} size="lg" />
                </a>
              ) : null}
              <Typography className={classes.email}>Email: {email}</Typography>
              <Typography className={classes.textStyle}>Cell: {cell}</Typography>
              <Typography className={classes.textStyle}>Location: {city}</Typography>
              <Typography className={classes.textStyle}>Description: {description}</Typography>
            </div>
          </Container>
          <Link to="/updateProfile" className={classes.link}>
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
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
