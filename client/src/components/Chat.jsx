import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Message from "./Message.jsx";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import Axios from "axios";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
import { chatStyles, body } from "../styles/styles.js";
import { IconButton, Grid, TextField, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import VideoCallIcon from "@material-ui/icons/VideoCall";

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
  const main = body();

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
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography className={chatClasses.header} align="center" variant="h3">
          Chat
        </Typography>
        <Grid
          container
          className={chatClasses.messageContainer}
          justify="center"
          alignItems="center"
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
        <Grid
          container
          className={main.body}
          justify="center"
          alignItems="flex-start"
          direction="row"
        >
          <Grid container justify="center" alignItems="flex-start">
            <div className={chatClasses.messageContainer}>
              <Typography className={chatClasses.header2} align="center" variant="h5">
                Send message
              </Typography>
              {load === false ? null : (
                <Typography variant="h6" className={chatClasses.header2}>
                  Sending...
                </Typography>
              )}
              <label className={chatClasses.header2}>
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
              <label className={chatClasses.header2}>
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
                onChange={(event) => setMessage(event.target.value)}
                type="text"
                align="center"
                className={chatClasses.chatText}
                multiline={true}
                rowsMax={15}
                size="medium"
                fullWidth
              />

              <Grid justify="space-between" container alignItems="flex-end" direction="row">
                <IconButton className={chatClasses.button} onClick={() => createVCRoom()}>
                  <VideoCallIcon />
                </IconButton>
                <IconButton className={chatClasses.button} onClick={() => sendMsg()}>
                  <SendIcon />
                </IconButton>
              </Grid>
            </div>
          </Grid>
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
