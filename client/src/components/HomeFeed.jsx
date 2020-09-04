import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostFeedEntry from "./PostFeedEntry.jsx";
import axios from "axios";

const HomeFeed = ({ generalFeed, currentUser }) => {
  const logout = () => {
    axios
      .get("/logout")
      .then(() => console.info("successful logout"))
      .catch((err) => console.warn("unsucessful logout: ", err));
  };

  return (
    <div>
      <div>
        <Link to={"/chats"}>
          <button>Chats</button>
        </Link>
      </div>
      <div>
        <Link to={`/profile/${currentUser.id}`}>
          <button>My Profile</button>
        </Link>
      </div>
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
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={currentUser.propic}
            alt="Avatar"
            style={{
              width: "auto",
              height: "100%",
              display: "inline",
              margin: "0 auto",
              marginLeft: "-25%",
            }}
          />
        </div>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Search for Post"
          style={{ width: "500px", height: "30px", fontSize: "14px", paddingLeft: "10px" }}
        ></input>
        <button type="button" style={{ borderRadius: "5px" }}>
          <img src="https://tinyurl.com/y2v9h8rz" style={{ width: "15%", height: "15%" }} />
        </button>
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
              }}
            >
              Create A Post
            </button>
          </Link>
        </div>
      </div>
      <div style={{ backgroundColor: "rgb(200,200,200)", height: "500px" }}>
        {generalFeed.map((post, i) => (
          <div key={i}>
            <PostFeedEntry post={post} />
            <br />
          </div>
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
  currentUser: PropTypes.object.isRequired,
};

export default HomeFeed;
