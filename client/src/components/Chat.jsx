import React, { useState, useEffect } from "react";
import Message from "./Message.jsx";
import PropTypes from "prop-types";
import io from "socket.io-client";
let socket = io("localhost:8080");

const Chat = ({ menu, match, currentUser }) => {
  socket.on("receive", (data) => {
    setallMsgs(data);
  });

  const [userMessage, setMessage] = useState("");
  const [allMsgs, setallMsgs] = useState([]);
  const id_chat = match.params.id;
  const id_user = currentUser.id;
  useEffect(() => {
    socket.emit("getMessages", id_user);
  }, []);
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
        <div>
          <div>
            <h2>Send message</h2>
            <input
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              type="text"
            />
            <button
              onClick={() => {
                socket.emit("sending", {
                  id_chat: id_chat,
                  id_user: id_user,
                  message: userMessage,
                });
              }}
            >
              Submit
            </button>
          </div>
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
  currentUser: PropTypes.object.isRequired,
};

export default Chat;
