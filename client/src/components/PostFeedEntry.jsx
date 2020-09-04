import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

const PostFeedEntry = ({ post }) => {
  const { id, id_user, message } = post;

  const [poster, setPoster] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("/poster", { id: id_user })
      .then((user) => setPoster(user.data))
      .catch((err) => console.warn("could not get this poster.", err));
  }, []);

  useEffect(() => {
    axios
      .get("/posttags", { id: id })
      .then((tags) => {
        const allTags = tags.data.map((tagObj) => tagObj.tag);
        setTags(allTags);
      })
      .catch((err) => console.warn("could not get tags for post.", err));
  }, []);

  return (
    <div>
      <Link style={{ color: "#ff8c00" }} to={`/fullMessage/${id_user}`}>
        <div
          id="profile"
          style={{
            border: "2px solid black",
            width: "400px",
            height: "100px",
            margin: "0 auto",
            backgroundColor: "#3F3D3D",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              resize: "both",
              overflow: "auto",
              width: "300px",
              height: "20px",
              textAlign: "center",
              left: "100px",
              fontSize: "14px",
            }}
          >
            {poster.username}
          </div>
          <div
            style={{
              position: "absolute",
              top: "5",
              resize: "both",
              overflow: "auto",
              width: "100px",
              height: "100px",
              textAlign: "center",
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
              width: "300px",
              height: "60px",
              textAlign: "center",
              left: "100px",
              fontSize: "12px",
            }}
          >
            {message}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              resize: "both",
              overflow: "auto",
              width: "300px",
              height: "20px",
              textAlign: "center",
              left: "100px",
            }}
          >
            <div>{tags.join(" ")}</div>
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
};

export default PostFeedEntry;
