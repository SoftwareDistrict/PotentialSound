import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ChatEntry = ({ chatMessage }) => {
  const { participants } = chatMessage;

  return (
    <Link to="/chat/:id">
      <div
        className=""
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
          <div>
            <label>Chat Members:</label>
            {participants.join(" ")}
          </div>
        </div>
      </div>
    </Link>
  );
};

ChatEntry.propTypes = {
  chatMessage: PropTypes.object.isRequired,
};

export default ChatEntry;
