import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PostFullMessage = ({ generalFeed, users, match }) => {
  const [poster, setPoster] = useState("");
  const [currentPost, setCurrentPost] = useState("");

  generalFeed.forEach((post) => {
    if (post.id_user === match.params.id) {
      setCurrentPost(post);
    }
  });

  users.forEach((user) => {
    if (user.id === match.params.id) {
      setPoster(user);
    }
  });

  useEffect(() => {
    generalFeed.forEach((post) => {
      if (post.id_user === match.params.id) {
        setCurrentPost(post);
      }
    });
  }, [generalFeed]);

  useEffect(() => {
    users.forEach((user) => {
      if (user.id === match.params.id) {
        setPoster(user);
      }
    });
  }, [users]);

  const onEvent = (event, setFunc, val) => {
    if (event.target.value === "" || event.target.value === undefined) {
      setFunc(val);
    } else {
      setFunc(event.target.value);
    }
  };

  return (
    <div>
      <div
        id="profile"
        style={{
          border: "2px solid black",
          width: "500px",
          height: "300px",
          textAlign: "center",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div style={{ fontSize: "125%" }}>{poster.username} posted</div>
        <div>Message: {currentPost.message}</div>
        <br />
        <div
          style={{
            position: "absolute",
            top: "5",
            textAlign: "center",
            resize: "both",
            overflow: "auto",
            width: "150px",
            height: "150px",
          }}
        >
          Profile Pic:
          <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={poster.propic} />
        </div>
        <br />
      </div>
      <div>
        <h3>Reply</h3>
        <label>
          Message{" "}
          <input size="60" onChange={(event) => onEvent(event)} type="text" placeholder="Message" />
        </label>
        <br />
        <br />
        <button>Submit</button>
      </div>
    </div>
  );
};

PostFullMessage.propTypes = {
  match: PropTypes.object.isRequired,
  generalFeed: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

export default PostFullMessage;
