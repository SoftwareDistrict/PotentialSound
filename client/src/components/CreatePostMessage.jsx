import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreatePostMessage = () => {
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);

  const onEvent = (event, setFunc, val) => {
    if (event.target.value === "" || event.target.value === undefined) {
      setFunc(val);
    } else {
      setFunc(event.target.value);
    }
  };

  const onCheck = (event) => {
    let selectedTag = event.target.value;
    let foundTag = tags.find((tag) => tag === selectedTag);
    if (foundTag) {
      let proxyTags = [...tags];
      proxyTags.splice(proxyTags.indexOf(foundTag), 1);
      setTags(proxyTags);
    } else {
      setTags([...tags, selectedTag]);
    }
  };

  const onSubmit = () => {
    const messageLength = message.length > 20;
    if (tags.length && messageLength) {
      axios
        .post("/createPostMessage", {
          tags: tags,
          message: message,
        })
        .then((item) => {
          console.info(item, "post was a success!");
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return (
    <div>
      <h1>Make a Post</h1>
      <div>
        <label htmlFor="tag1">Collab</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag1"
          name="type"
          value="#collab"
          onChange={(event) => onCheck(event)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag2">Rock</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag2"
          name="type"
          value="#rock"
          onChange={(event) => onCheck(event)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag3">Metal</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag3"
          name="type"
          value="#metal"
          onChange={(event) => onCheck(event)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag4">Vocalist</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag4"
          name="type"
          value="#vocalist"
          onChange={(event) => onCheck(event)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag5">{"R&B beats"}</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag5"
          name="type"
          value={"#r&b"}
          onChange={(event) => onCheck(event)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="tag6">Help Wanted</label>
        <input
          className="messageCheckbox"
          type="checkbox"
          id="tag6"
          name="type"
          value="#help-wanted"
          onChange={(event) => onCheck(event)}
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
        <button onClick={() => onSubmit()}>Submit</button>
      </div>
      <Link to="/">Back to HomeFeed</Link>
    </div>
  );
};

export default CreatePostMessage;
