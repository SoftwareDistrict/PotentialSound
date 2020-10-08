import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import axios from "axios";
import { messageStyles } from "../styles/styles.js";
import { Grid, Avatar, FormControl, Input } from "@material-ui/core";

const Message = ({ id_user, message, createdAt, img, audio, audioName, meeting }) => {
  const [messenger, setMessenger] = useState("");

  const classes = messageStyles();

  useEffect(() => {
    axios
      .get(`/poster/${id_user}`)
      .then((user) => setMessenger(user.data))
      .catch((err) => console.warn("could not get this messenger.", err));
  }, []);

  return (
    <Grid item className={classes.messageDiv}>
      <Grid container justify="flex-start" alignItems="flex-start" direction="row">
        <Avatar alt={messenger.username} src={messenger.propic} className={classes.avatar} />
        <div className={classes.grid2}>
          <div className={classes.username}>{messenger.username}</div>
          <div className={classes.message}>{message}</div>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.msgItemCon}
          >
            {meeting ? (
              <FormControl component="form" action={meeting}>
                <Input className={classes.button} type="submit" value="JOIN" />
              </FormControl>
            ) : null}
            {img ? <img className={classes.msgImg} src={img} /> : null}
            {audio ? (
              <form action={audio}>
                <input type="submit" value={`Download ${audioName}`} />
              </form>
            ) : null}
          </Grid>
        </div>
      </Grid>
      <div className={classes.time}>
        <Moment fromNow>{createdAt}</Moment>
      </div>
    </Grid>
  );
};
Message.propTypes = {
  id_user: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  img: PropTypes.string,
  audio: PropTypes.string,
  audioName: PropTypes.string,
  meeting: PropTypes.string,
};

export default Message;
