import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "regenerator-runtime/runtime";

const PostFullMessage = ({ match, currentUser }) => {
  const { id } = match.params;
  const [poster, setPoster] = useState({});
  const [post, setPost] = useState({});
  const [userMessage, setMessage] = useState("");
  useEffect(async () => {
    await axios
      .get(`/poster/${id[0]}`)
      .then((poster) => setPoster(poster.data))
      .catch((err) => console.warn("could not get this poster.", err));

    axios
      .get(`/thispost/${id[1]}`)
      .then((post) => setPost(post.data))
      .catch((err) => console.warn("could not get this post.", err));
  }, []);

  const sendMessage = () => {
    const messageObj = {
      message: userMessage,
      id_user: currentUser.id,
      id_chat: id,
    };

    axios.post("/sendMessage", messageObj).then((data) => {
      console.info(data, "sent successful message through axios request");
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
      <div
        id="profile"
        style={{
          border: "2px solid black",
          width: "500px",
          height: "300px",
          textAlign: "center",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div style={{ fontSize: "125%" }}>{poster.username} posted</div>
        <div>Message: {post.message}</div>
        <div
          style={{
            position: "absolute",
            top: "5",
            textAlign: "center",
            resize: "both",
            overflow: "auto",
            width: "150px",
            height: "150px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Profile Pic:
          <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={poster.propic} />
        </div>
      </div>
      <div>
        <h3>{`Send a message to ${poster.username}`}</h3>
        <input
          id="input-message"
          size="60"
          onChange={(event) => onEvent(event, setMessage)}
          type="text"
          placeholder="Message"
        />
        <button onClick={sendMessage} style={{ marginLeft: "5px" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

PostFullMessage.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default PostFullMessage;
