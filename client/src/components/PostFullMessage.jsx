import React, { useState, useEffect } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import axios from "axios";
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
      <div
        id="profile"
        style={{
          backgroundColor: "#3F3D3D",
          border: "2px solid black",
          width: "350px",
          height: "450px",
          textAlign: "center",
          margin: "0 auto",
          position: "relative",
          color: "#E7912D",
        }}
      >
        <div style={{ fontSize: "125%", marginTop: "10px" }}>{poster.username}</div>
        <div
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
            top: "40px",
            left: "100px",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src={poster.propic}
            alt="Avatar"
            style={{
              display: "inline-flex",
              margin: "0 auto",
              marginLeft: "-25%",
              height: "100%",
              width: "auto",
            }}
          />
        </div>
        <div style={{ marginTop: "160px" }}>
          <div style={{ fontSize: "18px" }}>{post.message}</div>
          <div style={{ fontSize: "16px", marginTop: "10px" }}>{postTags.join(" ")}</div>
          {post.audioName ? <a href={post.audioUrl}>{post.audioName}</a> : null}
          {post.imageName ? <a href={post.imageUrl}>{post.imageName}</a> : null}
        </div>
      </div>
      <div>
        {post.youTubeUrl ? (
          <iframe
            width="360"
            height="215"
            src={`https://www.youtube.com/embed/${post.youTubeUrl}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullscreen
          ></iframe>
        ) : null}
      </div>
      <div>
        <h3>Send {poster.username} a message</h3>
        {sent ? <div>...Sent</div> : <div></div>}
        <label>
          <input
            id="input-message"
            style={{
              width: "250px",
              height: "80px",
              fontSize: "16px",
              marginLeft: "10px",
              paddingLeft: "10px",
            }}
            onChange={(event) => onEvent(event, setMessage)}
            type="text"
            placeholder="Message"
          />
          <button onClick={onSubmit} style={{ marginLeft: "5px", backgroundColor: "#eb8c34" }}>
            Submit
          </button>
        </label>
      </div>
    </div>
  );
};

PostFullMessage.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default PostFullMessage;
