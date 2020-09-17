import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import Appbar from "./Appbar.jsx";
import PostFeedEntry from "./PostFeedEntry.jsx";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import { feedStyles } from "../styles/styles.js";

const HomeFeed = ({ currentUser }) => {
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
      <Appbar currentUser={currentUser} />
      <Link to="/createPostMessage" className={classes.link}>
        <Button className={classes.button}>Create A Post</Button>
      </Link>
      <Search tags={tags} users={users} setSearched={setSearched} setSearchFeed={setSearchFeed} />
      <div className={classes.feed}>
        {!searched ? (
          <Grid container justify="flex-start" alignItems="center" direction="column-reverse">
            {feed.map((post) => (
              <PostFeedEntry key={post.id} post={post} users={users} tags={tags} />
            ))}
          </Grid>
        ) : (
          <div>
            <Button onClick={() => setSearched(false)} className={classes.backButton}>
              Back To General
            </Button>
            <Grid container justify="center" alignItems="center" direction="column-reverse">
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
  audio: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

export default HomeFeed;
