import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CreatePostMessage = () => {
  const [message, setMessage] = useState("");
  const onEvent = (event, setFunc, val) => {
    if (event.target.value === "" || event.target.value === undefined) {
      setFunc(val);
    } else {
      setFunc(event.target.value);
    }
  };

  return (
    <div>
      <h1>Make a Post</h1>
      <div>
        <label htmlFor="tag1">Collab</label>
        <input className="messageCheckbox" type="checkbox" id="tag1" name="type" value="#collab" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag2">Rock</label>
        <input className="messageCheckbox" type="checkbox" id="tag2" name="type" value="#rock" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag3">Metal</label>
        <input className="messageCheckbox" type="checkbox" id="tag3" name="type" value="#metal" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag4">Vocalist</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag4"
          name="type"
          value="#vocalist"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag5">{"R&B beats"}</label>
        <input className="messageCheckbox" type="checkbox" id="tag5" name="type" value={"#r&b"} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag6">Help Wanted</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag6"
          name="type"
          value="#help-wanted"
        />
        <br />
        <br />
        <label>
          Message{" "}
          <input
            size="60"
            onChange={(event) => onEvent(event, setMessage, message)}
            type="text"
            placeholder={"Message"}
          />
        </label>
        <br />
        <br />
        <button
          onClick={() => {
            //-
            var arrayTags = [];
            var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
            for (var i = 0; i < checkboxes.length; i++) {
              arrayTags.push(checkboxes[i].value);
            }
          }}
        >
          Submit
        </button>
      </div>
      <Link to="/">Back to HomeFeed</Link>
    </div>
  );
};

CreatePostMessage.propTypes = {
  makeNewPost: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userProfilePic: PropTypes.string.isRequired,
};

export default CreatePostMessage;
