import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
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
    <Grid item className={classes.grid}>
      <Grid container justify="flex-start" alignItems="flex-start" direction="row">
        <img className={classes.avatar} src={poster.propic} />
        <div className={classes.grid2}>
          <Grid container justify="space-between" alignItems="flex-start" direction="column">
            <Link to={`/viewprofile/${poster.username}`} className={classes.username}>
              {poster.username}
            </Link>
            <Link to={`/home/${post.id_user}${post.id}`} className={classes.tags}>
              {post.message}
            </Link>
            {post.audioName ? (
              <a href={post.audioUrl} className={classes.anchor}>
                HEAR AUDIO
              </a>
            ) : null}
            {post.imageName ? (
              <a href={post.imageUrl} className={classes.anchor}>
                SEE IMAGE
              </a>
            ) : null}
            <div className={classes.tags}>{postTags.join(" ")}</div>
          </Grid>
        </div>
      </Grid>
      {post.youTubeUrl ? (
        <div style={{ padding: "5px" }}>
          <iframe
            src={`https://www.youtube.com/embed/${post.youTubeUrl}`}
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : null}
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
