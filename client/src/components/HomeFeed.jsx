import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import PostFeedEntry from "./PostFeedEntry.jsx";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const HomeFeed = ({ currentUser, menu }) => {
  const [users, setUsers] = useState([]);
  const [feed, setFeed] = useState([]);
  const [tags, setTags] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchFeed, setSearchFeed] = useState([]);

  const useStyles = makeStyles({
    avatar: {
      height: 90,
      width: 90,
      position: "absolute",
      top: "10px",
      right: "25px",
      variant: "circle",
    },
  });
  const classes = useStyles();

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

  const logout = () => {
    axios.get("/logout").catch((err) => console.warn("unsucessful logout: ", err));
  };

  return (
    <div>
      <div style={{ backgroundColor: "#eb8c34" }}>
        {menu}
        <div>
          <Link to={"/"}>
            <button style={{ backgroundColor: "#3F3D3D", color: "#eb8c34" }} onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
        <h1>
          PotentialSound
          <Avatar alt={currentUser.username} src={currentUser.propic} className={classes.avatar} />
        </h1>
      </div>
      <div>
        <Search tags={tags} users={users} setSearched={setSearched} setSearchFeed={setSearchFeed} />
        <div>
          <Link to="/createPostMessage">
            <button
              type="button"
              style={{
                fontSize: "20px",
                padding: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "5px",
                margin: "10px",
                backgroundColor: "#eb8c34",
              }}
            >
              Create A Post
            </button>
          </Link>
        </div>
      </div>
      {!searched ? (
        <div style={{ backgroundColor: "#3F3D3D", height: "500px", padding: "5px" }}>
          {feed.map((post) => (
            <PostFeedEntry key={post.id} post={post} users={users} tags={tags} />
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSearched(false)}>Back To General</button>
          <div style={{ backgroundColor: "#3F3D3D", height: "500px", padding: "5px" }}>
            {searchFeed.map((post) => (
              <PostFeedEntry key={post.id} post={post} users={users} tags={tags} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

HomeFeed.propTypes = {
  menu: PropTypes.element,
  audio: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

export default HomeFeed;
