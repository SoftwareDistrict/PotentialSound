import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CreateChat = ({ menu, currentUser }) => {
  const inputBox = useRef();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [usersObj, setUsersObj] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [members, setMembers] = useState([]);
  const [chatId, setChatId] = useState(0);

  useEffect(async () => {
    getUsers();
    await axios
      .get("/users")
      .then(({ data }) => setUsersObj(data))
      .catch((err) => console.warn("could not grab all usrs: ", err));
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
    setText(value);
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
    let messageObj = { message: message, id_user: userId, id_chat: chatId };
    axios.post("/sendMessage", messageObj).catch((err) => console.warn("sendMessage: ", err));
  };

  const createChat = () => {
    axios
      .post("/createChat")
      .then((chatId) => setChatId(chatId.data.id))
      .catch((err) => console.warn("error in create chat: ", err));
  };

  const createJoin = (userId, chatId) => {
    let obj = { id_user: userId, id_chat: chatId };
    axios.post("/createJoin", obj).catch((err) => console.warn("error in create Join: ", err));
  };

  const onSubmit = async () => {
    if (filterChatWithIds.length === ids.length) {
      sendMessage(message, currentUser.id, filterChatWithIds[0].id_chat);
    } else {
      await createChat();
      await ids.forEach((id) => createJoin(id, chatId));
      sendMessage(message, currentUser.id, chatId);
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

  return (
    <div>
      {menu}
      <div>
        <label>
          <h3>Send a message</h3>
          <label>
            {" "}
            To:
            <div
              style={{
                width: "100%",
                border: "1px solid grey",
                boxShadow: "2px 2px 1px rgba(50, 50, 50, 0.75)",
              }}
            >
              <div>{members.join(", ")}</div>
              <input
                style={{ width: "100%" }}
                value={text}
                onChange={onTextChange}
                placeholder="Username"
              />
              {renderSuggestions()}
            </div>
          </label>
          <input
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            ref={inputBox}
            style={{
              width: "250px",
              height: "80px",
              fontSize: "16px",
              marginLeft: "10px",
              paddingLeft: "10px",
            }}
            type="text"
            placeholder="Message"
          />
          <br />
          <button onClick={onSubmit} style={{ marginLeft: "5px", backgroundColor: "#eb8c34" }}>
            Submit
          </button>
        </label>
      </div>
    </div>
  );
};

CreateChat.propTypes = {
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default CreateChat;
