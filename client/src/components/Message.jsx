import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import axios from "axios";
import { dark, light, white } from "../styles/styles.js";
import { makeStyles } from "@material-ui/core/styles";

const Message = ({ id_user, message, createdAt, img, audio, audioName }) => {
  const [messenger, setMessenger] = useState("");

  const messageStyles = makeStyles({
    messageDiv: {
      border: "2px solid black",
      borderColor: light,
      backgroundColor: dark,
      color: white,
      width: "337px",
      marginTop: "5px",
    },
  });
  const messageClasses = messageStyles();

  useEffect(() => {
    axios
      .get(`/poster/${id_user}`)
      .then((user) => setMessenger(user.data))
      .catch((err) => console.warn("could not get this messenger.", err));
  }, []);

  return (
    <div className={messageClasses.messageDiv}>
      <div
        style={{
          width: "100px",
          height: "100px",
          float: "left",
        }}
      >
        <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={messenger.propic} />
      </div>
      <div
        style={{
          width: "280px",
          height: "20px",
          textAlign: "left",
          fontSize: "18px",
          marginLeft: "110px",
        }}
      >
        {messenger.username}
      </div>
      <div
        style={{
          backgroundColor: "offwhite",
          width: "220px",
          height: "60px",
          textAlign: "left",
          fontSize: "16px",
          marginLeft: "110px",
        }}
      >
        {message}
        {img ? (
          <div>
            <img src={img} />
          </div>
        ) : null}
        {audio ? (
          <div>
            <form action={audio}>
              <input type="submit" value={`Download ${audioName}`} />
            </form>
          </div>
        ) : null}
      </div>
      <div
        style={{
          width: "260px",
          height: "20px",
          textAlign: "left",
          marginLeft: "110px",
          marginTop: "10px",
          marginBottom: "5px",
        }}
      >
        <Moment fromNow>{createdAt}</Moment>
      </div>
    </div>
  );
};
Message.propTypes = {
  id_user: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  img: PropTypes.string,
  audio: PropTypes.string,
  audioName: PropTypes.string,
};

export default Message;
