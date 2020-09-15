import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import PostFeedEntry from "./PostFeedEntry.jsx";
import axios from "axios";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { feedStyles, dark } from "../styles/styles.js";

const HomeFeed = ({ currentUser, menu }) => {
  const [users, setUsers] = useState([]);
  const [feed, setFeed] = useState([]);
  const [tags, setTags] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchFeed, setSearchFeed] = useState([]);
  const classes = feedStyles();

  useEffect(() => {
    axios
      .get("/feed")
      .then((feed) => setFeed(feed.data))
      .catch((err) => console.warn("Could not get all posts", err));
  }, [feed]);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.warn("Could not get all users", err));
  }, []);

  useEffect(() => {
    axios
      .get("/posttags")
      .then((tags) => setTags(tags.data))
      .catch((err) => console.warn("Could not get all tags", err));
  }, [tags]);

  return (
    <div>
      <Grid container direction="row" style={{ backgroundColor: dark }}>
        <Typography variant="h4" className={classes.header}>
          PotentialSound
          {menu}
        </Typography>
        <Avatar alt={currentUser.username} src={currentUser.propic} className={classes.avatar} />
      </Grid>
      <div className={classes.feed}>
        <Link to="/createPostMessage" className={classes.link}>
          <Button className={classes.button}>Create A Post</Button>
        </Link>
        <Search tags={tags} users={users} setSearched={setSearched} setSearchFeed={setSearchFeed} />
        {!searched ? (
          <Grid container justify="flex-start" alignItems="center" direction="column">
            {feed.map((post) => (
              <PostFeedEntry key={post.id} post={post} users={users} tags={tags} />
            ))}
          </Grid>
        ) : (
          <div>
            <Button onClick={() => setSearched(false)} className={classes.button}>
              Back To General
            </Button>
            <Grid container justify="center" alignItems="center" direction="column">
              {searchFeed.map((post) => (
                <PostFeedEntry key={post.id} post={post} users={users} tags={tags} />
              ))}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

HomeFeed.propTypes = {
  menu: PropTypes.element,
  audio: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

export default HomeFeed;
