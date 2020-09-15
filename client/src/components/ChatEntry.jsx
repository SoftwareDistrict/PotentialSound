import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ChatEntry = ({ participants, id_chat }) => {
  const members = [];

  const useStyles = makeStyles({
    avatar: {
      height: 50,
      width: 50,
      variant: "circle",
    },
    avatarGroup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  const classes = useStyles();

  participants.forEach((member) => {
    if (member.chatId === id_chat) {
      members.push(member);
    }
  });

  return (
    <Link to={`/chats/${id_chat}`} style={{ textDecoration: "none", color: "orange" }}>
      <div
        className="inbox"
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
            fontSize: "20px",
          }}
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
