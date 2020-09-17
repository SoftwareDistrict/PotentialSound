import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import { dark } from "../styles/styles.js";
import { chatEntryStyles } from "../styles/styles.js";

const ChatEntry = ({ participants, id_chat }) => {
  const members = [];

  const classes = chatEntryStyles();

  participants.forEach((member) => {
    if (member.chatId === id_chat) {
      members.push(member);
    }
  });

  return (
    <Link to={`/chats/${id_chat}`} style={{ textDecoration: "none", color: dark }}>
      <div className={classes.pDiv}>
        <div
          style={{
            resize: "both",
            overflow: "auto",
            width: "350px",
            textAlign: "center",
            fontSize: "20px",
          }}
          className={classes.text}
        >
          <label>Chat Members:</label>
          <AvatarGroup max={4} className={classes.avatarGroup}>
            {members.map(({ username, chatId, pic }, i) => (
              <Avatar key={i} id={chatId} alt={username} src={pic} className={classes.avatar} />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </Link>
  );
};

ChatEntry.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.number,
      propic: PropTypes.string,
    })
  ),
  id_chat: PropTypes.number.isRequired,
};

export default ChatEntry;
