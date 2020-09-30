import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar, Typography } from "@material-ui/core";
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
    <Link to={`/chats/${id_chat}`} className={classes.link}>
      <div className={classes.pDiv}>
        <Typography className={classes.text}>Chat Members:</Typography>
        <AvatarGroup max={4} className={classes.avatarGroup}>
          {members.map(({ username, chatId, pic }, i) => (
            <Avatar key={i} id={chatId} alt={username} src={pic} className={classes.avatar} />
          ))}
        </AvatarGroup>
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
