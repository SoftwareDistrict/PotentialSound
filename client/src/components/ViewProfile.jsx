import React, { useState, useEffect } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { Avatar, Grid, GridList, GridListTile, Container, Typography } from "@material-ui/core";
import { profileStyle, body } from "../styles/styles.js";
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
  const main = body();
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
              <Typography variant="h3" align="center" className={classes.username}>
                {username}
              </Typography>
              <Avatar alt={username} src={proInfo.propic} className={classes.avatar} />
              <div>
                <Grid container justify="center" alignItems="flex-start" direction="column">
                  <Grid container justify="center" alignItems="center" direction="row">
                    <div style={{ fontSize: 35, marginTop: "20px" }}>
                      {proInfo.youTube ? (
                        <a href={proInfo.youTube} style={{ marginRight: "20px" }}>
                          <FontAwesomeIcon color="red" icon={faYoutube} size="sm" />
                        </a>
                      ) : null}
                      {proInfo.instagram ? (
                        <a href={proInfo.instagram} style={{ marginRight: "20px" }}>
                          <FontAwesomeIcon color="#e4405f" icon={faInstagram} size="sm" />
                        </a>
                      ) : null}
                      {proInfo.soundCloud ? (
                        <a href={proInfo.soundCloud} style={{ marginRight: "20px" }}>
                          <FontAwesomeIcon color="red" icon={faSoundcloud} size="sm" />
                        </a>
                      ) : null}
                      {proInfo.facebook ? (
                        <a href={proInfo.facebook} style={{ marginRight: "20px" }}>
                          <FontAwesomeIcon color="blue" icon={faFacebook} size="sm" />
                        </a>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid container justify="center" alignItems="flex-start" direction="column">
                    <Typography className={classes.email}>Email: {proInfo.email}</Typography>
                    <Typography className={classes.textStyle}>Cell: {proInfo.cell}</Typography>
                    <Typography className={classes.textStyle}>Location: {proInfo.city}</Typography>
                    <Typography className={classes.textStyle}>
                      Description: {proInfo.description}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Container>
            <div>
              {instaPic[0] ? (
                <div>
                  <GridList cols={2}>
                    <GridListTile>
                      <img src={instaPic[0].imageUrl} className={classes.gridList} />
                    </GridListTile>
                    <GridListTile>
                      <img src={instaPic[1].imageUrl} className={classes.gridList} />
                    </GridListTile>
                    <GridListTile>
                      <img src={instaPic[2].imageUrl} className={classes.gridList} />
                    </GridListTile>
                    <GridListTile>
                      <img src={instaPic[3].imageUrl} className={classes.gridList} />
                    </GridListTile>
                    <GridListTile>
                      <img src={instaPic[4].imageUrl} className={classes.gridList} />
                    </GridListTile>
                    <GridListTile>
                      <img src={instaPic[5].imageUrl} className={classes.gridList} />
                    </GridListTile>
                  </GridList>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
ViewProfile.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};
export default ViewProfile;
