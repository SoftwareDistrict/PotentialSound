import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import "regenerator-runtime/runtime";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Typography, List, ListItemText } from "@material-ui/core";
import { createMessageStyles } from "../styles/styles.js";

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
  const classes = createMessageStyles();

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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.suggestions}
      >
        <List component="ul" disablePadding={true} className={classes.list}>
          <Typography variant="h6"> Select User: </Typography>
          {suggestions.map((user, i) => (
            <ListItemText className={classes.li} onClick={() => suggestionSelected(user)} key={i}>
              {user}
            </ListItemText>
          ))}
        </List>
      </Grid>
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
      sortedSuggestions = users
        .sort()
        .filter((v) => regex.test(v))
        .filter((e) => !members.includes(e));
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
    <div>
      <Appbar currentUser={currentUser} />
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography className={classes.header} align="center" variant="h4">
          Create a chat!
        </Typography>
        <Grid
          direction="column"
          alignItems="center"
          justify="center"
          container
          className={classes.box}
        >
          {members.length > 0 ? (
            <Typography variant="h6">Sending message to</Typography>
          ) : (
            <Typography variant="h6">Who are you trying to send a message to?</Typography>
          )}
          {members.map((mem, i) => (
            <span className={classes.selectedUser} key={i}>
              <span id={`child${i}`} key={i} value={mem} onClick={() => removeMem(`child${i}`)}>
                {(i === 0 && members.length === 1) || members.length - 1 === i ? mem : `${mem}, `}
              </span>
            </span>
          ))}
        </Grid>
        <Grid alignItems="center" justify="center" direction="column" container>
          <TextField
            value={text}
            type="text"
            onChange={onTextChange}
            placeholder="Username"
            className={classes.chatInput}
          />
          {renderSuggestions()}
        </Grid>
        <Grid direction="column" alignItems="center" justify="center" container>
          <TextField
            className={classes.chatText}
            multiline
            rows={3}
            onChange={(event) => setMessage(event.target.value)}
            inputRef={inputBox}
            type="text"
            placeholder="Message"
            rowsMax={8}
          />
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
