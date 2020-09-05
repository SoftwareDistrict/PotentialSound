import React, { useState } from "react";
import ChatEntry from "./ChatEntry.jsx";
import PropTypes from "prop-types";

const Chats = ({ currentUser, allChats, menu, users }) => {
  const [participants, setParticipants] = useState("");
  const [chatIds] = useState(
    allChats.map((chat) => {
      if (chat.id_user === currentUser.id) {
        return chat.id_chat;
      }
    })
  );

  setParticipants(
    allChats.map((chat) => {
      return chatIds.map((id) => {
        return users.map((user) => {
          if (id === chat.id_chat) {
            if (user.id === chat.id_user) {
              return user.username;
            }
          }
        });
      });
    })
  );

  return (
    <div>
      {menu}
      <h1>Current Messages (Inbox) </h1>
      {allChats.map(({ id, id_chat }) => (
        <ChatEntry key={id} id_chat={id_chat} participants={participants} />
      ))}
    </div>
  );
};

Chats.propTypes = {
  currentUser: PropTypes.object.isRequired,
  allChats: PropTypes.object.isRequired,
  menu: PropTypes.element,
  users: PropTypes.object.isRequired,
};

export default Chats;
