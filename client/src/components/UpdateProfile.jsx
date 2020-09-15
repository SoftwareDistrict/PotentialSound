import React, { useState } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";

const style = {
  margin: "10px",
  display: "block",
};

const UpdateProfile = ({ currentUser, getCurrentUser }) => {
  const [newUser, setNewUser] = useState(currentUser.username);
  const [newCity, setNewCity] = useState(currentUser.city);
  const [newCell, setNewCell] = useState(currentUser.cell);
  const [newDescription, setNewDescription] = useState(currentUser.description);
  const [photo, setPhoto] = useState([]);
  const [endPt, setEndPt] = useState("");
  const [load, setLoad] = useState(false);
  const [soundCloud, setSoundCloud] = useState(currentUser.soundCloud);
  const [youTube, setYouTube] = useState(currentUser.youTube);
  const [instagram, setInstagram] = useState(currentUser.instagram);
  const [faceBook, setFaceBook] = useState(currentUser.facebook);

  const uploadImg = () => {
    let data = new FormData();

    data.append("image", photo[0], photo[0].name);

    return axios.post("/api/uploadImageUpdate", data);
  };

  const sendUpdates = (url) => {
    if (url) {
      return axios.post("/profileUpdate", {
        username: newUser,
        propic: url,
        city: newCity,
        cell: newCell,
        description: newDescription,
        youTube: youTube,
        facebook: faceBook,
        instagram: instagram,
        soundCloud: soundCloud,
      });
    } else {
      return axios.post("/profileUpdate", {
        username: newUser,
        propic: currentUser.propic,
        city: newCity,
        cell: newCell,
        description: newDescription,
        youTube: youTube,
        facebook: faceBook,
        instagram: instagram,
        soundCloud: soundCloud,
      });
    }
  };

  const updateProfile = () => {
    setLoad(true);
    if (!photo.length) {
      sendUpdates()
        .then(({ data }) => {
          setEndPt(data.redirectUrl);
          setLoad(false);
        })
        .then(() => getCurrentUser())
        .catch((err) => console.warn(err));
    } else {
      uploadImg()
        .then(({ data }) => sendUpdates(data))
        .then(({ data }) => {
          setEndPt(data.redirectUrl);
          setLoad(false);
        })
        .then(() => getCurrentUser())
        .catch((err) => console.warn(err));
    }
  };

  const onDrop = (picture) => {
    setPhoto(photo.concat(picture));
  };

  return (
    <div>
      {load === false ? (
        <div>
          <Appbar />
          <h1>Update Your Profile</h1>
          <input
            style={{ marginBottom: "10px", display: "block" }}
            value={newUser}
            onChange={(e) => {
              setNewUser(e.target.value);
            }}
          ></input>
          <input
            style={{ marginBottom: "10px", display: "block" }}
            value={newCity}
            onChange={(e) => {
              setNewCity(e.target.value);
            }}
          ></input>
          <input
            style={{ marginBottom: "10px", display: "block" }}
            value={newCell}
            onChange={(e) => {
              setNewCell(e.target.value);
            }}
          ></input>
          <input
            style={{ marginBottom: "10px", display: "block" }}
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          ></input>
          <h3>Update your social media profile urls</h3>
          <input
            style={style}
            value={faceBook}
            onChange={(e) => setFaceBook(e.target.value)}
          ></input>
          <input
            style={style}
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          ></input>
          <input style={style} value={youTube} onChange={(e) => setYouTube(e.target.value)}></input>
          <input
            style={style}
            value={soundCloud}
            onChange={(e) => setSoundCloud(e.target.value)}
          ></input>
          <ImageUploader
            withIcon={false}
            withPreview={true}
            singleImage={true}
            buttonText="Select Image"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png"]}
            maxFileSize={5242880}
          />
          <button
            style={{ backgroundColor: "#eb8c34", marginTop: "30px" }}
            type="button"
            onClick={() => updateProfile()}
          >
            Submit Change
          </button>
        </div>
      ) : (
        <div>
          <h1>Updating Profile...</h1>
        </div>
      )}
      {!endPt.length ? null : <Redirect to={`${endPt}`} />}
    </div>
  );
};

UpdateProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

export default UpdateProfile;
