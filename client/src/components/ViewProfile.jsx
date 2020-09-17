import React, { useState, useEffect } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { Avatar, Grid, GridList, GridListTile, Container, Typography } from "@material-ui/core";
import { profileStyle } from "../styles/styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "regenerator-runtime/runtime";

const ViewProfile = ({ match, currentUser }) => {
  const classes = profileStyle();
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Container className={classes.container}>
          <Typography variant="h3" align="center">
            {username}
          </Typography>
          <Avatar alt={username} src={proInfo.propic} className={classes.avatar} />
          <div>
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
        </Container>
        <div>
          {instaPic[0] ? (
            <div className={classes.root}>
              <GridList cols={2}>
                <GridListTile>
                  <img src={instaPic[0].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={instaPic[1].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={instaPic[2].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={instaPic[3].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={instaPic[4].imageUrl} />
                </GridListTile>
                <GridListTile>
                  <img src={instaPic[5].imageUrl} />
                </GridListTile>
              </GridList>
            </div>
          ) : null}
        </div>
      </Grid>
    </div>
  );
};
ViewProfile.propTypes = {
  match: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
};
export default ViewProfile;
