import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";

const CreatePostMessage = () => {
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState([]);
  const [audioName, setAudioName] = useState("");
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState("");

  const onChangeAudio = (event) => {
    if (!event.target.files.length) {
      setAudio([]);
      setAudioName("");
    } else {
      setAudio([event.target.files[0]]);
      setAudioName(event.target.files[0].name);
    }
  };

  const onChangeImage = (picture) => {
    if (!picture.length) {
      setImage([]);
      setImageName("");
    } else {
      setImage(picture);
      setImageName(picture[0].name);
    }
  };

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
          setImage([]);
          setImageName("");
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
          setAudio([]);
          setAudioName([]);
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
          setImage([]);
          setImageName("");
          setAudio([]);
          setAudioName([]);
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
            {/* // Genres */}
            <label htmlFor="tag1">Rap</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag1"
              name="type"
              value="#rap"
              onChange={(event) => onCheck(event)}
            />
            <label htmlFor="tag2">{"R&B"}</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag2"
              name="type"
              value={"#r&b"}
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag3">Hip-Hop</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag3"
              name="type"
              value="#hip-hop"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag4">Country</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag4"
              name="type"
              value="#country"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag5">Jazz</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag5"
              name="type"
              value="#jazz"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag6">Rock</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag6"
              name="type"
              value="#rock"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag7">Metal</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag7"
              name="type"
              value="#metal"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag8">Electronic</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag8"
              name="type"
              value="#electronic"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag9">Instrumental</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag9"
              name="type"
              value="#instrumental"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/* // Talent Type */}
            <label htmlFor="tag10">Vocalist</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag10"
              name="type"
              value="#vocalist"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag11">Beats</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag11"
              name="type"
              value="#beats"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag12">Rapper</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag12"
              name="type"
              value="#rapper"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag13">Song Writer</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag13"
              name="type"
              value="#song-writer"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag14">Studio</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag14"
              name="type"
              value="#studio"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag15">Management</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag15"
              name="type"
              value="#management"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag16">Band</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag16"
              name="type"
              value="#band"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/* // Other */}
            <label htmlFor="tag17">Help Wanted</label>
            <input
              style={{ marginBottom: "10px" }}
              className="messageCheckbox"
              type="checkbox"
              id="tag17"
              name="type"
              value="#help-wanted"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag18">Collab</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag18"
              name="type"
              value="#collab"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag19">Sale</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag19"
              name="type"
              value="#sale"
              onChange={(event) => onCheck(event)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="tag20">Instrument</label>
            <input
              className="messageCheckbox"
              type="checkbox"
              id="tag20"
              name="type"
              value="#instrument"
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
                style={{ width: "250px", paddingLeft: "10px", fontSize: "16px", height: "30px" }}
                onChange={(event) => onEvent(event, setMessage, message)}
                type="text"
                placeholder={"Message"}
              />
            </label>
            <button
              style={{ marginTop: "10px", backgroundColor: "#eb8c34" }}
              onClick={() => onSubmit()}
            >
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

export default CreatePostMessage;
