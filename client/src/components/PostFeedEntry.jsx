import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostFeedEntry = ({ post, users, tags }) => {
  const [poster, setPoster] = useState({});
  const [postTags] = useState([]);

  useEffect(() => {
    users.forEach((user) => {
      if (user.id === post.id_user) {
        setPoster(user);
      }
    });
  }, [users]);

  useEffect(() => {
    tags.forEach((tag) => {
      if (tag.id_post === post.id && !postTags.includes(tag.tag)) {
        postTags.push(tag.tag);
      }
    });
  }, [tags]);

  return (
    <div>
      <Link
        style={{ color: "#ff8c00", textDecoration: "none" }}
        to={`/home/${post.id_user}${post.id}`}
      >
        <div
          id="profile"
          style={{
            border: "2px solid black",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              textAlign: "left",
              paddingLeft: "5px",
              float: "left",
            }}
          >
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={poster.propic} />
          </div>
          <div
            style={{
              height: "20px",
              textAlign: "left",
              fontSize: "16px",
              marginLeft: "110px",
            }}
          >
            <Link
              to={`/viewprofile/${poster.username}`}
              style={{ color: "orange", textDecoration: "none", fontSize: "20px" }}
            >
              {poster.username}
            </Link>
          </div>
          <div
            style={{
              backgroundColor: "offwhite",
              height: "60px",
              textAlign: "left",
              fontSize: "14px",
              marginLeft: "110px",
            }}
          >
            <div>{post.message}</div>
            {post.audioName ? (
              <div>
                <a href={post.audioUrl}>{post.audioName}</a>
              </div>
            ) : null}
            {post.imageName ? (
              <div>
                <a href={post.imageUrl}>{post.imageName}</a>
              </div>
            ) : null}
          </div>
          <div
            style={{
              marginLeft: "180px",
            }}
          >
            {post.youTubeUrl ? (
              <iframe
                width="160"
                height="95"
                src={`https://www.youtube.com/embed/${post.youTubeUrl}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullscreen
              ></iframe>
            ) : null}
          </div>
          <div
            style={{
              height: "20px",
              textAlign: "left",
              marginLeft: "110px",
              marginTop: "10px",
            }}
          >
            {postTags.join(" ")}
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
    audioUrl: PropTypes.string,
    audioName: PropTypes.string,
    imageUrl: PropTypes.string,
    imageName: PropTypes.string,
    youTubeUrl: PropTypes.string,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      propic: PropTypes.string,
      city: PropTypes.string,
      description: PropTypes.string,
      googleId: PropTypes.string,
      email: PropTypes.string,
      cell: PropTypes.string,
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
  ),
};

export default PostFeedEntry;
