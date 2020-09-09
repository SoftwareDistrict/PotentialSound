import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CreateChat = ({ match, menu, currentUser }) => {
  const inputBox = useRef();

  const { id } = match.params;
  console.info(id);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");
  const [usersObj, setUsersObj] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [text, setText] = useState("");
  // const [allChats, setAllChats] = useState("");

  // const [usersChats, setUserChats] = useState("");

  useEffect(() => {
    getUsers();

    axios
      .get("/allchats")
      .then(({ data }) => {
        console.info("getuserchats", data);
        // setAllChats(data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const suggestionSelected = (value) => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    console.info("redner suggestions");
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
        let usersArr = users.data.map((obj) => obj.username);
        setUsers(usersArr);
      })
      .catch((err) => console.info(err));
  };
  const sendMessage = () => {
    let sendeeObj = usersObj.find((user) => user.username === text);
    if (!sendeeObj) {
      alert("Not a valid Username!");
      return;
    }
    let sendeeId = sendeeObj.id;
    const messageObj = {
      message: message,
      id_user: currentUser.id,
      postUserId: sendeeId,
    };

    axios.post("/sendChatMessage", messageObj).then((data) => {
      console.info(data, "sent successful message through axios request");
      // setUserChats(data);
      setMessage("");
      alert("Message was sent!");
      inputBox.current.value = "";
      // ("input-message").value = "";
    });
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
          <button onClick={sendMessage} style={{ marginLeft: "5px", backgroundColor: "#eb8c34" }}>
            Submit
          </button>
        </label>
      </div>
    </div>
  );
};

CreateChat.propTypes = {
  match: PropTypes.object.isRequired,
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default CreateChat;
