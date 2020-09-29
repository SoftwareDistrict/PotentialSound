import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Message from "./Message.jsx";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
import { chatStyles, body } from "../styles/styles.js";
import { IconButton, Grid, TextField, Typography, InputLabel, Input } from "@material-ui/core";
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
  // const [participants, setParticipants] = useState([]);

  const classes = chatStyles();
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

  // useEffect(() => getPics(), []);

  const createVCRoom = () => {
    const id = uuid();
    history.push(`/room/${id}`);
    socket.emit("sending", {
      id_chat: idChat,
      id_user: id_user,
      message: `${currentUser.username} has invited you to join in`,
      meeting: `https://069bfdcb45d1.ngrok.io${history.location.pathname}`,
    });
  };

  // const getPics = () => {
  //   axios.get(`participants/${idChat}`)
  //     .then((participants) => {
  //       console.log("partssss: ", participants);
  //     })
  //     .catch((err) => console.warn("could not get partisipants", err));
  // };

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
    return axios.post("/api/uploadImage", data);
  };

  const uploadAudio = () => {
    const data = new FormData();
    data.append("audio", audio[0], audio[0].name);
    return axios.post("/api/uploadAudio", data);
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
      axios
        .all([uploadImg(), uploadAudio()])
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
        <Typography className={classes.header} align="center" variant="h3">
          Chat
        </Typography>
        <div className={classes.messageContainer}>
          {allMsgs.map((msg) => {
            if (match.params.id == msg.id_chat) {
              return (
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  direction="column-reverse"
                  key={msg.id}
                >
                  <Message
                    id_user={msg.id_user}
                    message={msg.message}
                    createdAt={msg.createdAt}
                    img={msg.url_image}
                    audio={msg.url_audio}
                    audioName={msg.name_audio}
                    meeting={msg.meeting}
                  />
                </Grid>
              );
            }
          })}
        </div>
        <Grid
          container
          className={main.body}
          justify="center"
          alignItems="flex-start"
          direction="row"
        >
          <Grid container justify="center" alignItems="flex-start">
            <div className={classes.messageContainer}>
              <Typography className={classes.header3} align="center" variant="h5">
                Send message
              </Typography>
              <InputLabel className={classes.header2} variant="outlined">
                Add Image:
              </InputLabel>
              <Input
                className={classes.fileButton}
                type="file"
                ref={imageRef}
                name="image"
                accept=".png, .jpg, .gif"
                onChange={(e) => onChangePhoto(e)}
              />
              <InputLabel className={classes.header2} variant="outlined">
                Add Audio:
              </InputLabel>
              <Input
                className={classes.fileButton}
                type="file"
                ref={audioRef}
                name="audio"
                accept="audio/mpeg"
                onChange={(e) => onChangeAudio(e)}
              />
              {load === false ? null : (
                <Typography variant="h5" className={classes.header3}>
                  Sending...
                </Typography>
              )}
              <TextField
                id="msg"
                value={userMessage}
                placeholder="Message"
                onChange={(event) => setMessage(event.target.value)}
                type="text"
                align="center"
                className={classes.chatText}
                multiline={true}
                rowsMax={15}
                size="medium"
                fullWidth
              />

              <Grid justify="space-between" container alignItems="flex-end" direction="row">
                <IconButton className={classes.button} onClick={() => createVCRoom()}>
                  <VideoCallIcon />
                </IconButton>
                <IconButton className={classes.button} onClick={() => sendMsg()}>
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
