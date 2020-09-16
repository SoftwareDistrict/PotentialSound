import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import "regenerator-runtime/runtime";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const CreateChat = ({ currentUser }) => {
  const inputBox = useRef();
  const hist = useHistory();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [usersObj, setUsersObj] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [members, setMembers] = useState([]);

  const useStyles = makeStyles({
    pDiv: {
      height: "100vh",
      backgroundColor: "#2B2D42",
    },
    avatarGroup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    parentGrid: {
      backgroundColor: "#2B2D42",
    },
    username: {
      backgroundColor: "#EDF2F4",
    },
    text: {
      backgroundColor: "#EDF2F4",
    },
    button: {
      backgroundColor: "white",
    },
  });
  const classes = useStyles();

  const getAllUsers = async () => {
    await axios
      .get("/users")
      .then(({ data }) => setUsersObj(data))
      .catch((err) => console.warn("could not grab all usrs: ", err));
  };

  useEffect(() => {
    getUsers();
    getAllUsers();
    axios
      .get("/allchats")
      .then(({ data }) => setAllChats(data))
      .catch((err) => console.warn("could not grab ChatJoi: ", err));
    setMembers([]);
  }, []);

  const currentUsersChats = allChats.filter((chat) => currentUser.id === chat.id_user);
  const allChatsWithId = currentUsersChats.map((userChat) =>
    allChats.filter((chat) => chat.id_chat === userChat.id_chat)
  );

  const memberIds = members
    .map((member) => usersObj.filter((user) => user.username === member))
    .flat();

  const ids = memberIds.map((m) => m.id).concat(currentUser.id);

  const filterChatWithIds = allChatsWithId
    .filter((arr) => arr.filter((obj) => ids.includes(obj.id_user)).length === arr.length)
    .flat();

  const suggestionSelected = (value) => {
    setText("");
    setMembers([...members, value]);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((user, i) => (
          <li onClick={() => suggestionSelected(user)} key={i}>
            {user}
          </li>
        ))}
      </ul>
    );
  };

  const getUsers = () => {
    axios
      .get("/users")
      .then((users) => {
        setUsersObj(users.data);

        const usersArr = users.data
          .map((obj) => obj.username)
          .filter((username) => username !== currentUser.username);

        setUsers(usersArr);
      })
      .catch((err) => console.warn("could not get all suernames: ", err));
  };

  const sendMessage = (message, userId, chatId) => {
    const messageObj = { message: message, id_user: userId, id_chat: chatId };
    axios
      .post("/sendMessage", messageObj)
      .then(() => hist.push(`/chats/${chatId}`))
      .catch((err) => console.warn("sendMessage: ", err));
  };

  const createChat = () => {
    axios
      .post("/createChat")
      .then(async (chatId) => {
        await ids.forEach((id) => createJoin(id, chatId.data.id));
        sendMessage(message, currentUser.id, chatId.data.id);
      })
      .catch((err) => console.warn("error in create chat: ", err));
  };

  const createJoin = (userId, chatId) => {
    const obj = { id_user: userId, id_chat: chatId };
    axios.post("/createJoin", obj).catch((err) => console.warn("error in create Join: ", err));
  };

  const onSubmit = () => {
    if (filterChatWithIds.length === ids.length) {
      sendMessage(message, currentUser.id, filterChatWithIds[0].id_chat);
    } else {
      createChat();
    }
    setMembers([]);
  };

  const onTextChange = (event) => {
    const value = event.target.value;
    let sortedSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      sortedSuggestions = users.sort().filter((v) => regex.test(v));
    }
    setSuggestions(sortedSuggestions);
    setText(value);
  };

  const removeMem = (child) => {
    const childValue = document.getElementById(child).getAttribute("value");
    const newMems = members.filter((mem) => mem !== childValue);
    setMembers(newMems);
  };

  return (
    <div className={classes.pDiv}>




      <Grid
        className={classes.parentGrid}
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >


        <Grid container spacing={3} item xs={12}>
          <Grid item xs={4}>
            <Appbar />
          </Grid>
          <Grid item xs={8} />
        </Grid>

        <Grid spacing={3} container item xs={12}>
          <Grid align="center" item xs={12}>
            <h3>Start a new message</h3>
          </Grid>
        </Grid>
        <Grid justify="center" container spacing={1} item xs={12}>
          <Grid align="center" justify="center" container item xs={12}>
            {members.length > 0 ? (
              <h3>Sending to </h3>
            ) : (
              <h3>Who are you looking to send a message to?</h3>
            )}

            <div
              style={{
                backgroundColor: "#EDF2F4",
                width: "100%",
                boxShadow: "2px 2px 1px rgba(50, 50, 50, 0.75)",
              }}
            >
              {members.map((mem, i) => (
                <span key={i}>
                  <span id={`child${i}`} key={i} value={mem} onClick={() => removeMem(`child${i}`)}>
                    {`${mem}   `}
                  </span>
                </span>
              ))}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <Grid align="center" container item xs={12}>
            <TextField
              align="center"
              rows={2}
              rowsMax={4}
              value={text}
              onChange={onTextChange}
              placeholder="Username"
              className={classes.username}
              borderRadius="50%"
            />
          </Grid>
          <Grid align="center" container item xs={12}>
            {renderSuggestions()}
          </Grid>
          <Grid align="center" container spacing={1} item xs={12}>
            <TextField
              align="center"
              className={classes.text}
              multiline
              rows={5}
              onChange={(event) => setMessage(event.target.value)}
              ref={inputBox}
              type="text"
              placeholder="Message"
              rowsMax={5}
              size="medium"
              fullWidth
              borderRadius="50%"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} align="center" item xs={12}>
          <Button onClick={onSubmit} className={classes.button}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

CreateChat.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default CreateChat;
