import React, { useState, useEffect } from "react";
import ChatEntry from "./ChatEntry.jsx";
import PropTypes from "prop-types";
import axios from "axios";

const Chats = ({ currentUser, allChats, menu }) => {
  const [participants, setParticipants] = useState([]);
  const [chatIds, setChatIds] = useState([]);

  const ids = [];
  allChats.forEach((chat) => {
    if (chat.id_user === currentUser.id) {
      ids.push(chat.id_chat);
    }
  });

  useEffect(() => {
    const ids = [];
    allChats.forEach((chat) => {
      if (chat.id_user === currentUser.id) {
        ids.push(chat.id_chat);
      }
    });
    setChatIds(ids);
  }, []);

  useEffect(() => {
    axios
      .get("/users")
      .then((users) => {
        const members = [];
        allChats.forEach((chat) => {
          chatIds.forEach((id) => {
            users.data.forEach((user) => {
              if (id === chat.id_chat) {
                if (user.id === chat.id_user) {
                  members.push([user.username, id]);
                }
              }
            });
          });
        });
        return members;
      })
      .then((members) => setParticipants(members))
      .catch((err) => console.warn("could not get all users in Chats.", err));
  }, [chatIds]);

  return (
    <div>
      {menu}
      <h1>Current Messages (Inbox) </h1>
      {ids.map((id) => (
        <ChatEntry key={id} id_chat={id} participants={participants} />
      ))}
    </div>
  );
};

Chats.propTypes = {
  currentUser: PropTypes.object.isRequired,
  menu: PropTypes.element,
  allChats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_user: PropTypes.number,
      id_chat: PropTypes.string,
    })
  ),
};

export default Chats;
