import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostFeedEntry from "./PostFeedEntry.jsx";
import axios from "axios";

const HomeFeed = ({ currentUser, tags, menu }) => {
  const [users, setUsers] = useState([]);
  const [generalFeed, setGeneralFeed] = useState([]);

  useEffect(() => {
    axios
      .get("/feed")
      .then((feed) => setGeneralFeed(feed.data))
      .catch((err) => console.warn("Could not get all posts", err));
  }, []);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.warn("Could not get all users", err));
  }, []);

  const logout = () => {
    axios
      .get("/logout")
      .then(() => console.info("successful logout"))
      .catch((err) => console.warn("unsucessful logout: ", err));
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
          <div
            style={{
              width: "90px",
              height: "90px",
              position: "absolute",
              top: "10px",
              right: "25px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              src={currentUser.propic}
              alt="Avatar"
              style={{
                display: "inline-flex",
                margin: "0 auto",
                height: "100%",
                width: "auto",
              }}
            />
          </div>
        </h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "250px",
            height: "30px",
            fontSize: "14px",
            paddingLeft: "10px",
            marginRight: "5px",
          }}
        ></input>
        <img
          src="https://tinyurl.com/y2v9h8rz"
          style={{ width: "10%", height: "10%", paddingTop: "20px" }}
        />
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
      <div style={{ backgroundColor: "#3F3D3D", height: "500px", padding: "5px" }}>
        {generalFeed.map((post) => (
          <PostFeedEntry key={post.id} post={post} users={users} tags={tags} />
        ))}
      </div>
    </div>
  );
};

HomeFeed.propTypes = {
  generalFeed: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_user: PropTypes.number,
      message: PropTypes.string,
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      id_post: PropTypes.number,
      tag: PropTypes.string,
    })
  ),
  menu: PropTypes.element,
  audio: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

export default HomeFeed;
