import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Message from "./Message.jsx";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import Axios from "axios";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { chatStyles } from "../styles/styles.js";

let socket = io("localhost:8080");

const Chat = ({ match, currentUser, history }) => {
  const audioRef = useRef();
  const imageRef = useRef();
  const idChat = match.params.id;
  const id_user = currentUser.id;
  const [userMessage, setMessage] = useState("");
  const [allMsgs, setallMsgs] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [audio, setAudio] = useState([]);
  const [load, setLoading] = useState(false);

  const chatClasses = chatStyles();

  socket.on("receive", (data) => {
    let { array, id_chat } = data.data;
    if (idChat == id_chat) {
      setallMsgs(array);
    }
  });

  useEffect(() => {
    socket.emit("getMessages", idChat);
  }, [allMsgs]);
  const createVCRoom = () => {
    const id = uuid();
    history.push(`/room/${id}`);
  };

  const onChangePhoto = (e) => {
    if (!e.target.files[0]) {
      setPhoto([]);
    } else {
      setPhoto([e.target.files[0]]);
    }
  };

  const onChangeAudio = (e) => {
    if (!e.target.files[0]) {
      setAudio([]);
    } else {
      setAudio([e.target.files[0]]);
    }
  };

  const uploadImg = () => {
    const data = new FormData();
    data.append("image", photo[0], photo[0].name);
    return Axios.post("/api/uploadImage", data);
  };

  const uploadAudio = () => {
    const data = new FormData();
    data.append("audio", audio[0], audio[0].name);
    return Axios.post("/api/uploadAudio", data);
  };

  const sendMsg = () => {
    if (photo.length && !audio.length) {
      setLoading(true);
      uploadImg()
        .then(({ data }) => {
          socket.emit("sending", {
            id_chat: idChat,
            id_user: id_user,
            message: userMessage,
            url_image: data,
          });
          setMessage("");
          imageRef.current.value = "";
          setPhoto([]);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    } else if (!photo.length && audio.length) {
      setLoading(true);
      uploadAudio()
        .then(({ data }) => {
          socket.emit("sending", {
            id_chat: idChat,
            id_user: id_user,
            message: userMessage,
            name_audio: audio[0].name,
            url_audio: data,
          });
          setMessage("");
          audioRef.current.value = "";
          setAudio([]);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    } else if (photo.length && audio.length) {
      setLoading(true);
      Axios.all([uploadImg(), uploadAudio()])
        .then((res) => {
          socket.emit("sending", {
            id_chat: idChat,
            id_user: id_user,
            message: userMessage,
            url_audio: res[1].data,
            name_audio: audio[0].name,
            url_image: res[0].data,
          });
          setMessage("");
          imageRef.current.value = "";
          audioRef.current.value = "";
          setPhoto([]);
          setAudio([]);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    } else {
      socket.emit("sending", {
        id_chat: idChat,
        id_user: id_user,
        message: userMessage,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <Appbar currentUser={currentUser} />
      <Grid direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid justify="center" alignItems="center" xs={12}>
          <Typography className={chatClasses.header} align="center" variant="h3">
            Chat
          </Typography>
        </Grid>
        <Grid
          className={chatClasses.messageContainer}
          justify="center"
          align="center"
          alignItems="center"
          xs={12}
        >
          {allMsgs.map((msg) => {
            if (match.params.id == msg.id_chat) {
              return (
                <Message
                  id_user={msg.id_user}
                  message={msg.message}
                  createdAt={msg.createdAt}
                  key={msg.id}
                  img={msg.url_image}
                  audio={msg.url_audio}
                  audioName={msg.name_audio}
                />
              );
            }
          })}
        </Grid>
        <Grid justify="center" align="center" alignItems="center" xs={12}>
          <div className={chatClasses.messageContainer}>
            <Typography className={chatClasses.header} align="center" variant="h5">
              Send message
            </Typography>
            {load === false ? null : <p>Sending...</p>}
            <label className={chatClasses.header}>
              Image:{" "}
              <input
                className={chatClasses.button}
                type="file"
                ref={imageRef}
                name="image"
                accept=".png, .jpg, .gif"
                onChange={(e) => onChangePhoto(e)}
              ></input>
            </label>
            <br />
            <label className={chatClasses.header}>
              Audio:{" "}
              <input
                className={chatClasses.button}
                type="file"
                ref={audioRef}
                name="audio"
                accept="audio/mpeg"
                onChange={(e) => onChangeAudio(e)}
              ></input>
            </label>
            <TextField
              id="msg"
              value={userMessage}
              placeholder="Message"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              type="text"
              align="center"
              className={chatClasses.chatText}
              multiline={true}
              rowsMax={15}
              size="medium"
              fullWidth
              borderRadius="50%"
              style={{ marginBottom: "10px" }}
            />

            <Grid justify="space-between" container alignItems="flex-end" direction="row">
              <Button
                className={chatClasses.button}
                onClick={() => {
                  sendMsg();
                }}
              >
                Submit
              </Button>
              <Button className={chatClasses.button} onClick={() => createVCRoom()}>
                Video Call
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Chat.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Chat);
