import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { postStyles } from "../styles/styles.js";

const PostFeedEntry = ({ post, users, tags }) => {
  const [poster, setPoster] = useState({});
  const [postTags] = useState([]);
  const classes = postStyles();

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
    <Grid container className={classes.grid}>
      <Avatar className={classes.avatar} variant="square" src={poster.propic} />
      <div>
        <Link to={`/viewprofile/${poster.username}`} className={classes.linkusername}>
          {poster.username}
        </Link>
      </div>
      <div>
        <Link to={`/home/${post.id_user}${post.id}`} className={classes.linkmsg}>
          {post.message}
        </Link>
      </div>
      {post.audioName ? (
        <div>
          <a
            href={post.audioUrl}
            style={{
              textDecoration: "none",
              height: "20px",
              textAlign: "left",
              marginTop: "10px",
              fontSize: "14px",
              color: "#E95A01",
            }}
          >
            {post.audioName}
          </a>
        </div>
      ) : null}
      {post.imageName ? (
        <div>
          <a
            href={post.imageUrl}
            style={{
              textDecoration: "none",
              height: "20px",
              textAlign: "left",
              marginTop: "10px",
              fontSize: "14px",
              color: "#E95A01",
            }}
          >
            {post.imageName}
          </a>
        </div>
      ) : null}
      <Typography className={classes.youtube}>
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
      </Typography>
      <Typography className={classes.tags}>{postTags.join(" ")}</Typography>
    </Grid>
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
