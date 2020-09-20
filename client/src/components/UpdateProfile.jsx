import React, { useState } from "react";
import Appbar from "./Appbar.jsx";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";
import { Button, Typography, Grid, Input, InputLabel } from "@material-ui/core";
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
          <Appbar currentUser={currentUser} />
          <div className={classes.container}>
            <Typography variant="h5" className={classes.header}>
              Update Your Profile
            </Typography>
            <InputLabel className={classes.formLabel} variant="outlined">
              Username
            </InputLabel>
            <Input
              className={classes.input}
              value={newUser}
              placeholder={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              City
            </InputLabel>
            <Input
              className={classes.input}
              value={newCity}
              placeholder={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Phone Number
            </InputLabel>
            <Input
              className={classes.input}
              value={newCell}
              placeholder={newCell}
              onChange={(e) => setNewCell(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Bio
            </InputLabel>
            <Input
              className={classes.input}
              value={newDescription}
              placeholder={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              multiline={true}
              type="text"
            />
            <Typography variant="h5" className={classes.header2}>
              Update Your Social Media
            </Typography>
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your Facebook
            </InputLabel>
            <Input
              className={classes.input}
              value={faceBook}
              placeholder="Facebook"
              onChange={(e) => setFaceBook(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your Instagram
            </InputLabel>
            <Input
              className={classes.input}
              value={instagram}
              placeholder="Instagram"
              onChange={(e) => setInstagram(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your YouTube
            </InputLabel>
            <Input
              className={classes.input}
              value={youTube}
              placeholder="YouTube"
              onChange={(e) => setYouTube(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your SoundCloud
            </InputLabel>
            <Input
              className={classes.input}
              value={soundCloud}
              placeholder="SoundCloud"
              onChange={(e) => setSoundCloud(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabelImage} variant="outlined">
              Profile Picture
            </InputLabel>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              singleImage={true}
              buttonText="Select Image"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", "jpeg"]}
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
          <img alt="PS" src="https://i.imgur.com/20PNAlU.png" className={loading.loadingImg} />
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
