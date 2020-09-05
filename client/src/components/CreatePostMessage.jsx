import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";

const CreatePostMessage = () => {
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState([]);

  const onDrop = (picture) => {
    setPhoto(photo.concat(picture));
  };

  const uploadImg = () => {
    let data = new FormData();
    data.append("image", photo[0], photo[0].name);
    axios
      .post("/api/uploadImagePost", data)
      .then(({ data }) => console.info(data))
      .catch((err) => console.warn(err));
  };

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
    uploadImg();
    const messageLength = message.length > 10;
    if (tags.length && messageLength) {
      axios
        .post("/createPostMessage", {
          tags: tags,
          message: message,
        })
        .then((item) => console.info(item, "post was a success!"))
        .catch((err) => console.warn("could not create post", err));
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
        <ImageUploader
          withIcon={false}
          withPreview={true}
          singleImage={true}
          buttonText="Choose Image"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png"]}
          maxFileSize={5242880}
        />
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
        <button onClick={() => onSubmit()}>
          <Link to="/home">Submit</Link>
        </button>
      </div>
    </div>
  );
};

export default CreatePostMessage;
