import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageUploader from "react-images-upload";
import { Redirect } from "react-router-dom";
import axios from "axios";

const style = {
  margin: "10px",
  display: "block",
};

const CreateProfile = ({ getCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [cell, setCell] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState([]);
  const [endPt, setEndPt] = useState("");
  const [load, setLoad] = useState(false);
  const [soundCloud, setSoundCloud] = useState("");
  const [youTube, setYouTube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [faceBook, setFaceBook] = useState("");
  const [instaHandle, setInstaHandle] = useState("");

  const uploadImg = () => {
    let data = new FormData();

    data.append("image", photo[0], photo[0].name);

    return axios.post("/api/uploadImage", data);
  };

  const sendUserProfile = (url) => {
    return axios.post("/createProfile", {
      username: username,
      propic: url,
      city: city,
      cell: cell,
      description: description,
      youTube: youTube,
      facebook: faceBook,
      instagram: instagram,
      soundCloud: soundCloud,
      instaHandle: instaHandle,
    });
  };

  const createProfile = () => {
    setLoad(true);
    uploadImg()
      .then(({ data }) => sendUserProfile(data))
      .then(({ data }) => {
        getCurrentUser();
        setEndPt(data.redirectUrl);
        setLoad(false);
      })
      .catch((err) => console.warn(err));
  };

  const onDrop = (picture) => {
    setPhoto(photo.concat(picture));
  };

  return (
    <div>
      {load === false ? (
        <div>
          <h1>Create Profile</h1>
          <input
            style={style}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            style={style}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <input
            style={style}
            placeholder="Enter Cell"
            onChange={(e) => setCell(e.target.value)}
          ></input>
          <input
            style={style}
            placeholder="Enter Descrition"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <div>
            <h3>Add your social media profile urls</h3>
            <input
              style={style}
              placeholder="Facebook"
              onChange={(e) => setFaceBook(e.target.value)}
            ></input>
            <input
              style={style}
              placeholder="Instagram"
              onChange={(e) => setInstagram(e.target.value)}
            ></input>
            <input
              style={style}
              placeholder="Youtube"
              onChange={(e) => setYouTube(e.target.value)}
            ></input>
            <input
              style={style}
              placeholder="SoundCloud"
              onChange={(e) => setSoundCloud(e.target.value)}
            ></input>
            <h3>Add Instagram Handle to display your profile Uploads (must be public)</h3>
            <input
              style={style}
              placeholder="Instagram Handle"
              onChange={(e) => setInstaHandle(e.target.value)}
            ></input>
          </div>
          <ImageUploader
            withIcon={false}
            withPreview={true}
            singleImage={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png"]}
            maxFileSize={5242880}
          />
          <button style={{ backgroundColor: "#eb8c34" }} onClick={() => createProfile()}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <h1>Creating Profile...</h1>
        </div>
      )}
      {!endPt.length ? null : <Redirect to={`${endPt}`} />}
    </div>
  );
};
CreateProfile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
};

export default CreateProfile;
