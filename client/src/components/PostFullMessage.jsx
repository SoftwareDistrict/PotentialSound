import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "regenerator-runtime/runtime";

const PostFullMessage = ({ match, menu, currentUser }) => {
  const { id } = match.params;
  const [poster, setPoster] = useState({});
  const [post, setPost] = useState({});
  const [postTags] = useState([]);
  const [userMessage, setMessage] = useState("");
  const [tags, setTags] = useState([]);

  const getPoster = async () => {
    await axios
      .get(`/poster/${id[0]}`)
      .then((poster) => setPoster(poster.data))
      .catch((err) => console.warn("could not get this poster.", err));
  };

  const getTags = async () => {
    await axios
      .get("/posttags")
      .then((tags) => setTags(tags.data))
      .catch((err) => console.warn("Could not get all tags", err));
  };

  useEffect(() => {
    getPoster();
    getTags();
    axios
      .get(`/thispost/${id[1]}`)
      .then((post) => setPost(post.data))
      .catch((err) => console.warn("could not get this post.", err));
  }, []);

  useEffect(() => {
    tags.forEach((tag) => {
      if (tag.id_post == id[1] && !postTags.includes(tag.tag)) {
        postTags.push(tag.tag);
      }
    });
  }, []);

  const sendMessage = () => {
    const messageObj = {
      message: userMessage,
      id_user: currentUser.id,
      postUserId: id,
    };

    axios.post("/sendMessage", messageObj).then(() => {
      setMessage("");
      alert("Message was sent!");
      document.getElementById("input-message").value = "";
    });
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
      {menu}
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
          <div style={{ fontSize: "16px", marginTop: "10px" }}>{postTags.join("   ")}</div>
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
        <h3>Reply</h3>
        <label>
          <h3>Send a message to {poster.username}</h3>
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
          <button onClick={sendMessage} style={{ marginLeft: "5px", backgroundColor: "#eb8c34" }}>
            Submit
          </button>
        </label>
      </div>
    </div>
  );
};

PostFullMessage.propTypes = {
  match: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_post: PropTypes.number,
      tag: PropTypes.string,
    })
  ),
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default PostFullMessage;
