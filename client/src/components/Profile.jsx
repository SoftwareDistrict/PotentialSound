import React from "react";
import { Link } from "react-router-dom";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Grid,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import { profileStyle, body } from "../styles/styles.js";
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
  } = currentUser;
  const classes = profileStyle();
  const main = body();

  return (
    <div>
      <Appbar currentUser={currentUser} />
      <Grid
        container
        className={main.body}
        justify="center"
        alignItems="flex-start"
        direction="row"
      >
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          direction="row"
          className={classes.mainContainer}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Container className={classes.container}>
              <Grid container justify="center" alignItems="center" direction="column">
                <Typography variant="h3" className={classes.username}>
                  {username}
                </Typography>
                <Avatar alt={username} src={propic} className={classes.avatar} />
              </Grid>
              <Grid container justify="center" alignItems="flex-start" direction="column">
                <Grid container justify="center" alignItems="center" direction="row">
                  <div className={classes.iconContainer}>
                    {youTube ? (
                      <a href={youTube} className={classes.link}>
                        <FontAwesomeIcon color="red" icon={faYoutube} size="sm" />
                      </a>
                    ) : null}
                    {instagram ? (
                      <a href={instagram} className={classes.link}>
                        <FontAwesomeIcon color="#e4405f" icon={faInstagram} size="sm" />
                      </a>
                    ) : null}
                    {soundCloud ? (
                      <a href={soundCloud} className={classes.link}>
                        <FontAwesomeIcon color="orange" icon={faSoundcloud} size="sm" />
                      </a>
                    ) : null}
                    {facebook ? (
                      <a href={facebook} className={classes.link}>
                        <FontAwesomeIcon color="blue" icon={faFacebook} size="sm" />
                      </a>
                    ) : null}
                  </div>
                  <Grid container justify="center" alignItems="flex-start" direction="column">
                    <Typography className={classes.email}>Email: {email}</Typography>
                    <Typography className={classes.textStyle}>Cell: {cell}</Typography>
                    <Typography className={classes.textStyle}>Location: {city}</Typography>
                    <Typography className={classes.textStyle}>
                      Description: {description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <Link to="/updateProfile" className={classes.link}>
              <Button className={classes.button}>Update Profile</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Profile;
