import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Message = ({ id_user, message, users }) => {
  const [messenger, setMessenger] = useState("");

  users.forEach((user) => {
    if (user.id === id_user) {
      setMessenger(user);
    }
  });

  useEffect(() => {
    users.forEach((user) => {
      if (user.id === id_user) {
        setMessenger(user);
      }
    });
  }, [users]);

  return (
    <div
      id="profile"
      style={{
        border: "2px solid black",
        width: "400px",
        height: "100px",
        margin: "0 auto",
        backgroundColor: "#3F3D3D",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          resize: "both",
          overflow: "auto",
          width: "300px",
          height: "20px",
          textAlign: "center",
          left: "100px",
          fontSize: "14px",
        }}
      >
        {messenger.username}
      </div>
      <div
        style={{
          position: "absolute",
          top: "5",
          resize: "both",
          overflow: "auto",
          width: "100px",
          height: "100px",
          textAlign: "center",
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
          width: "300px",
          height: "60px",
          textAlign: "center",
          left: "100px",
          fontSize: "12px",
        }}
      >
        {message}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          resize: "both",
          overflow: "auto",
          width: "300px",
          height: "20px",
          textAlign: "center",
          left: "100px",
        }}
      ></div>
    </div>
  );
};
Message.propTypes = {
  id_user: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};
export default Message;
