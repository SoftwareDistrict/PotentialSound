import React from "react";
import Message from "./Message.jsx";
import PropTypes from "prop-types";

const Chat = ({ menu, match, allMsgs }) => {
  return (
    <div>
      {menu}
      <div style={{ width: "350px", overflow: "hidden" }}>
        <h1 style={{ textAlign: "center" }}>Chat</h1>
        <div style={{ backgroundColor: "orange", padding: "7px", width: "350px" }}>
          {allMsgs.map((msg) => {
            if (match.params.id == msg.id_chat) {
              return <Message id_user={msg.id_user} message={msg.message} key={msg.id} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  allMsgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_user: PropTypes.mumber,
      id_chat: PropTypes.number,
      message: PropTypes.string,
    })
  ),
  menu: PropTypes.element,
  match: PropTypes.object.isRequired,
};

export default Chat;
