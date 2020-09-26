import React, { useState, useEffect } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { IconButton, Typography, Grid, Avatar, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { fullPostStyles, body } from "../styles/styles.js";
import "regenerator-runtime/runtime";

const PostFullMessage = ({ match, currentUser }) => {
  const { id } = match.params;
  const [poster, setPoster] = useState({});
  const [post, setPost] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [userMessage, setMessage] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [sent, setSent] = useState(false);
  const ids = [currentUser.id, id[0]];
  const classes = fullPostStyles();
  const main = body();

  setInterval(() => setSent(false), 7000);

  const getPoster = async () => {
    await axios
      .get(`/poster/${id[0]}`)
      .then((poster) => setPoster(poster.data))
      .catch((err) => console.warn("could not get this poster.", err));
  };

  const getTags = () => {
    axios
      .get("/posttags")
      .then(({ data }) => {
        const tagsForPost = data.map((tag) => {
          if (tag.id_post == id[1]) {
            return tag.tag;
          }
        });
        setPostTags(tagsForPost);
      })
      .catch((err) => console.warn("Could not get all tags", err));
  };

  const currentPost = () => {
    axios
      .get(`/thispost/${id[1]}`)
      .then((post) => setPost(post.data))
      .catch((err) => console.warn("could not get this post.", err));
  };

  const getChats = () => {
    axios
      .get("/allchats")
      .then(({ data }) => setAllChats(data))
      .catch((err) => console.warn("could not grab ChatJoin: ", err));
  };

  useEffect(() => {
    getPoster();
    getTags();
    getChats();
    currentPost();
  }, []);

  const currentUsersChats = allChats.filter((chat) => currentUser.id === chat.id_user);
  const posterChats = allChats.filter((chat) => poster.id === chat.id_user);
  const commonChats = currentUsersChats
    .map((userChat) => posterChats.filter((postChat) => userChat.id_chat === postChat.id_chat))
    .flat();
  const uniqueChats = commonChats.map((comChat) =>
    allChats.filter((chat) => chat.id_chat === comChat.id_chat)
  );
  const onlyChat = uniqueChats.filter((chatArr) => chatArr.length === 2).flat();

  const onSubmit = () => {
    if (commonChats.length) {
      if (onlyChat.length) {
        sendMessage(userMessage, currentUser.id, onlyChat[0].id_chat);
      } else {
        createChat();
      }
    } else {
      createChat();
    }
    setMessage("");
    document.getElementById("input-message").value = "";
  };

  const sendMessage = (message, userId, chatId) => {
    const messageObj = { message, id_user: userId, id_chat: chatId };
    axios
      .post("/sendMessage", messageObj)
      .then(() => setSent(true))
      .catch((err) => console.warn("sendMessage: ", err));
  };

  const createChat = () => {
    axios
      .post("/createChat")
      .then(async ({ data }) => {
        await ids.forEach((id) => createJoin(id, data.id));
        sendMessage(userMessage, currentUser.id, data.id);
      })
      .catch((err) => console.warn("error in create chat: ", err));
  };

  const createJoin = (userId, chatId) => {
    const obj = { id_user: userId, id_chat: chatId };
    axios.post("/createJoin", obj).catch((err) => console.warn("error in create Join: ", err));
  };

  const onEvent = (event, setFunc, val) => {
    if (event.target.value === "" || event.target.value === undefined) {
      setFunc(val);
    } else {
      setFunc(event.target.value);
    }
  };

  return (
    <div>
      <Appbar currentUser={currentUser} />
      <Grid
        container
        className={main.body}
        justify="center"
        alignItems="flex-start"
        direction="row"
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.mainContainer}
        >
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="column"
            className={classes.container}
          >
            <Typography variant="h4" className={classes.header}>
              {poster.username}
            </Typography>
            <Avatar src={poster.propic} alt="Avatar" className={classes.avatar} />
            <Typography className={classes.text}>{post.message}</Typography>
            <Typography className={classes.text}>{postTags.join(" ")}</Typography>
            {post.audioName ? (
              <a href={post.audioUrl} className={classes.link}>
                <Typography variant="h6" className={classes.header2}>
                  HEAR AUDIO
                </Typography>
              </a>
            ) : null}
            {post.imageName ? (
              <a href={post.imageUrl} className={classes.link}>
                <Typography variant="h6" className={classes.header2}>
                  SEE IMAGE
                </Typography>
              </a>
            ) : null}
            {post.youTubeUrl ? (
              <iframe
                src={`https://www.youtube.com/embed/${post.youTubeUrl}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </Grid>
        </Grid>
        <div>
          <Typography variant="h6" className={classes.header}>
            Send {poster.username} A Message
          </Typography>
          {sent ? (
            <Typography variant="h6" className={classes.header}>
              ...Sent
            </Typography>
          ) : null}
          <div>
            <Input
              id="input-message"
              className={classes.input}
              onChange={(event) => onEvent(event, setMessage)}
              type="text"
              placeholder="Message"
              multiline={true}
            />
            <IconButton onClick={onSubmit} className={classes.button}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </Grid>
    </div>
  );
};

PostFullMessage.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default PostFullMessage;
