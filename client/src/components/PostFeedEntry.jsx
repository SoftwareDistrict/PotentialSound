import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostFeedEntry = ({ post, users, tags }) => {
  const [poster, setPoster] = useState("");
  const [postTags] = useState([]);

  tags.forEach((tag) => {
    if (tag.id_post === post.id && !postTags.includes(tag.tag)) {
      postTags.push(tag.tag);
    }
  });

  useEffect(() => {
    users.forEach((user) => {
      if (user.id === post.id_user) {
        setPoster(user);
      }
    });
  }, []);

  useEffect(() => {
    tags.forEach((tag) => {
      if (tag.id_post === post.id && !postTags.includes(tag.tag)) {
        postTags.push(tag.tag);
      }
    });
  }, [tags]);

  return (
    <div>
      <Link style={{ color: "#ff8c00" }} to={`/fullMessage/${post.id_user}`}>
        <div
          id="profile"
          style={{
            border: "2px solid black",
            height: "100px",
            margin: "0 auto",
            backgroundColor: "#3F3D3D",
            position: "relative",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              resize: "both",
              overflow: "auto",
              height: "20px",
              textAlign: "left",
              left: "110px",
              fontSize: "14px",
            }}
          >
            {poster.username}
          </div>
          <div
            style={{
              position: "absolute",
              top: "5px",
              resize: "both",
              overflow: "auto",
              width: "100px",
              textAlign: "left",
              paddingLeft: "5px",
            }}
          >
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={poster.propic} />
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              backgroundColor: "offwhite",
              resize: "both",
              overflow: "auto",
              height: "60px",
              textAlign: "left",
              left: "110px",
              fontSize: "12px",
            }}
          >
            {post.message}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              resize: "both",
              overflow: "auto",
              height: "20px",
              textAlign: "left",
              left: "110px",
            }}
          >
            <div>{postTags.join("   ")}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

PostFeedEntry.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    id_user: PropTypes.number,
    message: PropTypes.string,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      propic: PropTypes.string,
      cell: PropTypes.string,
      description: PropTypes.string,
      city: PropTypes.string,
      googleId: PropTypes.string,
      email: PropTypes.string,
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_post: PropTypes.number,
      tag: PropTypes.string,
    })
  ),
  audio: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  )
};

export default PostFeedEntry;
