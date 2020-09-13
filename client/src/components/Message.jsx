import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import axios from "axios";

const Message = ({ id_user, message, createdAt, img, audio, audioName }) => {
  const [messenger, setMessenger] = useState("");

  useEffect(() => {
    axios
      .get(`/poster/${id_user}`)
      .then((user) => setMessenger(user.data))
      .catch((err) => console.warn("could not get this messenger.", err));
  }, []);

  return (
    <div
      id="profile"
      style={{
        border: "2px solid black",
        height: "100px",
        backgroundColor: "#3F3D3D",
        color: "orange",
        position: "relative",
        width: "330px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          resize: "both",
          overflow: "auto",
          width: "280px",
          height: "20px",
          textAlign: "left",
          left: "110px",
          fontSize: "18px",
        }}
      >
        {messenger.username}
      </div>
      <div
        style={{
          position: "absolute",
          top: "5",
          resize: "both",
          overflow: "hidden",
          width: "100px",
          height: "100px",
        }}
      >
        <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={messenger.propic} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          backgroundColor: "offwhite",
          resize: "both",
          overflow: "auto",
          width: "220px",
          height: "60px",
          textAlign: "left",
          left: "110px",
          fontSize: "16px",
        }}
      >
        {message}
        {img ? <img src={img} /> : null}
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
          position: "absolute",
          bottom: "5px",
          resize: "both",
          overflow: "auto",
          width: "260px",
          height: "20px",
          textAlign: "left",
          left: "110px",
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
