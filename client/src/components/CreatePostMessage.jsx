import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";
import PropTypes from "prop-types";

const CreatePostMessage = ({
  audio,
  onChangeAudio,
  onChangeImage,
  audioName,
  imageName,
  image,
}) => {
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadAudio = () => {
    setLoading(true);
    let data = new FormData();

    data.append("audio", audio[0], audioName);

    return axios.post("/api/uploadAudio", data);
  };

  const uploadImg = () => {
    setLoading(true);
    let data = new FormData();
    data.append("image", image[0], imageName);
    return axios.post("/api/uploadImagePost", data);
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

  const postMessage = () => {
    setLoading(true);
    const messageLength = message.length > 10;
    if (tags.length && messageLength) {
      return axios.post("/createPostMessage", {
        tags: tags,
        bodyMsg: { message: message },
      });
    }
  };

  const postMessageImage = (name, url) => {
    const messageLength = message.length > 10;
    if (tags.length && messageLength) {
      return axios.post("/createPostMessage", {
        tags: tags,
        bodyMsg: {
          message: message,
          imageUrl: url,
          imageName: name,
        },
      });
    }
  };

  const postMessageAudio = (name, url) => {
    const messageLength = message.length > 10;
    if (tags.length && messageLength) {
      return axios.post("/createPostMessage", {
        tags: tags,
        bodyMsg: {
          message: message,
          audioUrl: url,
          audioName: name,
        },
      });
    }
  };

  const postMessageAI = (obj) => {
    const messageLength = message.length > 10;
    if (tags.length && messageLength) {
      return axios.post("/createPostMessage", {
        tags: tags,
        bodyMsg: {
          message: message,
          audioUrl: obj.audioUrl,
          audioName: obj.audioName,
          imageUrl: obj.imageUrl,
          imageName: obj.imageName,
        },
      });
    }
  };

  const onSubmit = () => {
    if (!audioName.length && imageName.length) {
      uploadImg()
        .then(({ data }) => {
          return postMessageImage(imageName, data);
        })
        .then(({ data }) => {
          setRedirect(data.redirectUrl);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    } else if (!imageName.length && audioName.length) {
      uploadAudio()
        .then(({ data }) => {
          return postMessageAudio(audioName, data);
        })
        .then(({ data }) => {
          setRedirect(data.redirectUrl);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    } else if (imageName.length && audioName.length) {
      axios
        .all([uploadAudio(), uploadImg()])
        .then((res) => {
          return postMessageAI({
            audioName: audioName,
            imageName: imageName,
            audioUrl: res[0].data,
            imageUrl: res[1].data,
          });
        })
        .then(({ data }) => {
          setRedirect(data.redirectUrl);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    } else {
      postMessage()
        .then(({ data }) => {
          setRedirect(data.redirectUrl);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <div>
      {loading === false ? (
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
              style={{ marginBottom: "10px" }}
              className="messageCheckbox"
              type="checkbox"
              id="tag6"
              name="type"
              value="#help-wanted"
              onChange={(event) => onCheck(event)}
            />
            <ImageUploader
              withIcon={false}
              withPreview={true}
              singleImage={true}
              buttonText="Choose Image"
              onChange={(img) => onChangeImage(img)}
              imgExtension={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
            />
            <label>
              Audio:
              <input type="file" name="file" onChange={(e) => onChangeAudio(e)} />
            </label>
            <label>
              Message{" "}
              <input
                size="60"
                onChange={(event) => onEvent(event, setMessage, message)}
                type="text"
                placeholder={"Message"}
              />
            </label>
            <button style={{ marginTop: "10px" }} onClick={() => onSubmit()}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Posting...</h1>
        </div>
      )}
      {!redirect.length ? null : <Redirect to={redirect} />}
    </div>
  );
};

CreatePostMessage.propTypes = {
  audio: PropTypes.array,
  audioName: PropTypes.string,
  onChangeAudio: PropTypes.func,
  image: PropTypes.array,
  imageName: PropTypes.string,
  onChangeImage: PropTypes.func,
};

export default CreatePostMessage;
