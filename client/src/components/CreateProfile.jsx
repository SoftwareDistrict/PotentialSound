import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageUploader from "react-images-upload";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, Typography, Grid, Input, InputLabel } from "@material-ui/core";
import { profileFormStyles, loadStyles } from "../styles/styles.js";

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
  const classes = profileFormStyles();
  const loading = loadStyles();

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
          <div className={classes.container}>
            <Typography variant="h5" className={classes.header}>
              Create Profile
            </Typography>
            <InputLabel className={classes.formLabel} variant="outlined">
              Username
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              City
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Phone Number
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="Enter Cell"
              onChange={(e) => setCell(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Bio
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              multiline={true}
              type="text"
            />
            <Typography variant="h5" className={classes.header2}>
              Add Your Social Media
            </Typography>
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your Facebook
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="Facebook"
              onChange={(e) => setFaceBook(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your Instagram
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="Instagram"
              onChange={(e) => setInstagram(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your YouTube
            </InputLabel>
            <Input
              className={classes.input}
              placeholder="YouTube"
              onChange={(e) => setYouTube(e.target.value)}
              type="text"
            />
            <InputLabel className={classes.formLabel} variant="outlined">
              Add Your SoundCloud
            </InputLabel>
            <Input
              className={classes.input}
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
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              maxFileSize={5242880}
            />
            <Button className={classes.button} onClick={() => createProfile()}>
              Submit
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
            Creating Profile...
          </Typography>
          <CircularProgress />
        </Grid>
      )}
      {!endPt.length ? null : <Redirect to={`${endPt}`} />}
    </div>
  );
};
CreateProfile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
};

export default CreateProfile;
