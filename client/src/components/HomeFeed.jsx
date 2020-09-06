import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostFeedEntry from "./PostFeedEntry.jsx";
import axios from "axios";

const HomeFeed = ({ generalFeed, currentUser, users, tags, menu, audio }) => {
  const logout = () => {
    axios
      .get("/logout")
      .then(() => console.info("successful logout"))
      .catch((err) => console.warn("unsucessful logout: ", err));
  };

  return (
    <div>
      {menu}
      <div>
        <Link to={"/"}>
          <button onClick={logout}>Logout</button>
        </Link>
      </div>
      <h1>
        PotentialSound
        <div
          style={{
            width: "100px",
            height: "100px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src={currentUser.propic}
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
      </h1>
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
              }}
            >
              Create A Post
            </button>
          </Link>
        </div>
      </div>
      <div style={{ backgroundColor: "rgb(200,200,200)", height: "500px", padding: "5px" }}>
        {generalFeed.map((post) => (
          <PostFeedEntry key={post.id} post={post} users={users} tags={tags} audio={audio}/>
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
  currentUser: PropTypes.object.isRequired,
  menu: PropTypes.element,
  audio: PropTypes.array,
};

export default HomeFeed;
