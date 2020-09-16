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
import { dark, light, white } from "../styles/styles.js";
import Box from "@material-ui/core/Box";

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
      backgroundColor: light,
      color: dark,
    },
    suggestions: {
      backgroundColor: white,
      width: 250,
      fontSize: 14,
    },
    list: {
      listStyle: "none",
    },
    chatInput: {
      border: "4px solid black",
      width: 250,
      height: 30,
      fontSize: 14,

      backgroundColor: "white",
    },

    chatText: {
      border: "4px solid black",
      fontSize: 14,

      backgroundColor: "white",
    },
    selectedUser: {
      color: dark,
      fontWeight: "bold",
    },
    header: {
      color: white,
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
      <Box flex-grow justifyContent="center" className={classes.suggestions}>
        <ul className={classes.list}>
          <li> Select User: </li>
          {suggestions.map((user, i) => (
            <li className={classes.li} onClick={() => suggestionSelected(user)} key={i}>
              {user}
            </li>
          ))}
        </ul>
      </Box>
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
      sortedSuggestions = sortedSuggestions.filter((e) => !members.includes(e));
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

      <Grid
        className={classes.parentGrid}
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid spacing={1} container item xs={12}>
          <Grid align="center" className={classes.header} item xs={12}>
            <h1>Create a chat!</h1>
          </Grid>
          <Grid align="center" alignItems="center" justify="center" container item xs={12}>
            <Box
              width={3 / 4}
              style={{
                color: white,
                backgroundColor: light,
                border: "4px solid black",
              }}
            >
              {members.length > 0 ? (
                <h3>Sending message to </h3>
              ) : (
                <h3>Who are you trying to send a message to?</h3>
              )}
              {members.map((mem, i) => (
                <span className={classes.selectedUser} key={i}>
                  <span id={`child${i}`} key={i} value={mem} onClick={() => removeMem(`child${i}`)}>
                    {(i === 0 && members.length === 1) || members.length - 1 === i
                      ? mem
                      : `${mem}, `}
                  </span>
                </span>
              ))}
            </Box>
          </Grid>

          <Grid align="center" justify="center" container item xs={12}>
            <TextField
              align="center"
              rows={2}
              rowsMax={4}
              value={text}
              onChange={onTextChange}
              placeholder="Username"
              className={classes.chatInput}
              borderRadius="50%"
            />
            {renderSuggestions()}
          </Grid>
          <Grid align="center" justify="center" container item xs={12}>
            <TextField
              align="center"
              className={classes.chatText}
              multiline
              rows={14}
              onChange={(event) => setMessage(event.target.value)}
              ref={inputBox}
              type="text"
              placeholder="Message"
              rowsMax={15}
              size="medium"
              fullWidth
              borderRadius="50%"
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3} align="center" item xs={12}>
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
