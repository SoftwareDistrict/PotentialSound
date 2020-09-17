import React, { useState } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";
import { Button, Typography, Grid } from "@material-ui/core";
import { profileFormStyles, loadStyles } from "../styles/styles.js";

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
  const [instaHandle, setInstaHandle] = useState(currentUser.instaHandle);
  const loading = loadStyles();
  const classes = profileFormStyles();

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
        instaHandle: instaHandle,
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
        instaHandle: instaHandle,
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
          <Appbar currentUser={currentUser} />
          <div className={classes.container}>
            <Typography variant="h5" className={classes.header}>
              Update Your Profile
            </Typography>
            <input
              className={classes.input}
              value={newUser}
              placeHolder={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            ></input>
            <input
              className={classes.input}
              value={newCity}
              placeHolder={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            ></input>
            <input
              className={classes.input}
              value={newCell}
              placeHolder={newCell}
              onChange={(e) => setNewCell(e.target.value)}
            ></input>
            <input
              className={classes.input}
              value={newDescription}
              placeHolder={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></input>
            <Typography variant="h6" className={classes.header}>
              Update Your Social Media
            </Typography>
            <input
              className={classes.input}
              value={faceBook}
              placeholder="Facebook"
              onChange={(e) => setFaceBook(e.target.value)}
            ></input>
            <input
              className={classes.input}
              value={instagram}
              placeholder="Instagram"
              onChange={(e) => setInstagram(e.target.value)}
            ></input>
            <input
              className={classes.input}
              value={youTube}
              placeholder="Youtube"
              onChange={(e) => setYouTube(e.target.value)}
            ></input>
            <input
              className={classes.input}
              value={soundCloud}
              placeholder="soundCloud"
              onChange={(e) => setSoundCloud(e.target.value)}
            ></input>
            <Typography variant="h7" className={classes.header}>
              Update Your Instagram Handle (must be public)
            </Typography>
            <input
              className={classes.input}
              value={instaHandle}
              placeholder="Instagram Handle"
              onChange={(e) => {
                setInstaHandle(e.target.value);
              }}
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
            <Button className={classes.button} onClick={() => updateProfile()}>
              Submit Change
            </Button>
          </div>
        </div>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.loadingGrid}
        >
          <img alt="PS" src="../styles/logo.png" className={loading.loadingImg} />
          <Typography variant="h2" className={loading.loadingText}>
            Updating Profile...
          </Typography>
        </Grid>
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
