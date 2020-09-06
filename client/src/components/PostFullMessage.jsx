import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "regenerator-runtime/runtime";

const PostFullMessage = ({ match, tags, menu }) => {
  const { id } = match.params;
  const [poster, setPoster] = useState({});
  const [post, setPost] = useState({});
  const [postTags] = useState([]);

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

  useEffect(() => {
    tags.forEach((tag) => {
      if (tag.id_post == id[1] && !postTags.includes(tag.tag)) {
        postTags.push(tag.tag);
      }
    });
  }, []);

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
          height: "300px",
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
              display: "inline",
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
        </div>
      </div>
      <div>
        <h3>Reply</h3>
        <label>
          Message
          <input
            style={{
              width: "250px",
              height: "80px",
              fontSize: "16px",
              marginLeft: "10px",
              paddingLeft: "10px",
            }}
            onChange={(event) => onEvent(event)}
            type="text"
            placeholder="Message"
          />
          <button style={{ marginLeft: "5px", backgroundColor: "orange" }}>Submit</button>
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
};

export default PostFullMessage;
