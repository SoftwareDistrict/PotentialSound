import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ChatEntry = ({ participants, id_chat }) => {
  return (
    <Link to={`/chat/${id_chat}`}>
      <div
        className=""
        style={{
          border: "2px solid black",
          width: "350px",
          height: "100px",
          margin: "0 auto",
          backgroundColor: "#3F3D3D",
          position: "relative",
          alignItems: "center",
        }}
      >
        <div
          style={{
            resize: "both",
            overflow: "auto",
            width: "350px",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          <label>Chat Members:</label>
          <div>
            {participants.join(", ")}
          </div>
        </div>
      </div>
    </Link>
  );
};

ChatEntry.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    })
  ),
  id_chat: PropTypes.number.isRequired,
};

export default ChatEntry;
