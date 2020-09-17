import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Appbar from "./Appbar.jsx";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Input,
  Typography,
} from "@material-ui/core";
import { createPostStyles, light, white, loadStyles } from "../styles/styles.js";

const BlueCheckbox = withStyles({
  root: {
    color: white,
    "&$checked": {
      color: light,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CreatePostMessage = ({ currentUser }) => {
  const classes = createPostStyles();
  const load = loadStyles();
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState([]);
  const [audioName, setAudioName] = useState("");
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [clicked, setClicked] = useState(false);
  const [checked] = useState({
    rap: false,
    hiphop: false,
    country: false,
    jazz: false,
    rock: false,
    electronic: false,
    instrumental: false,
    vocalist: false,
    beats: false,
    rapper: false,
    songwriter: false,
    studio: false,
    management: false,
    band: false,
    helpwanted: false,
    collab: false,
    sale: false,
    instrument: false,
    image: false,
    audio: false,
    video: false,
  });

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

  const onYoutubeUrl = (event) => {
    const yTUrl = event.target.value;
    let youtubeID = youtube_parser(yTUrl);
    if (youtubeID) {
      setYouTubeUrl(youtubeID);
    } else {
      console.info("please input a valid youtube url");
    }
  };

  const youtube_parser = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const onCheck = (name, event) => {
    checked[name] = event.target.checked;
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
        bodyMsg: { message: message, youTubeUrl: youTubeUrl },
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

  const clickMe = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      {loading === false ? (
        <div>
          <Appbar currentUser={currentUser} />
          <div>
            <Grid container justify="center" alignItems="flex-start" direction="row">
              <button onClick={clickMe} className={classes.tagButton}>
                Add Some Tags
              </button>
            </Grid>
          </div>
          {clicked ? (
            <Grid
              container
              justify="center"
              alignItems="flex-start"
              direction="row"
              className={classes.tagGrid}
            >
              <div>
                <Grid container justify="flex-start" alignItems="flex-start" direction="column">
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Rap</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#rap"
                        checked={checked.rap}
                        onChange={(event) => onCheck("rap", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Hip-Hop</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#hip-hop"
                        checked={checked.hiphop}
                        onChange={(event) => onCheck("hiphop", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Country</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#country"
                        checked={checked.country}
                        onChange={(event) => onCheck("country", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Jazz</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#jazz"
                        checked={checked.jazz}
                        onChange={(event) => onCheck("jazz", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Rock</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#rock"
                        checked={checked.rock}
                        onChange={(event) => onCheck("rock", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Electronic</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#electronic"
                        checked={checked.electronic}
                        onChange={(event) => onCheck("electronic", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Instrumental</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#instrumental"
                        checked={checked.instrumental}
                        onChange={(event) => onCheck("instrumental", event)}
                      />
                    }
                  />
                </Grid>
              </div>
              <div>
                <Grid container justify="flex-start" alignItems="flex-start" direction="column">
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Vocalist</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#vocalist"
                        checked={checked.vocalist}
                        onChange={(event) => onCheck("vocalist", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Beats</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#beats"
                        checked={checked.beats}
                        onChange={(event) => onCheck("beats", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Rapper</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#rapper"
                        checked={checked.rapper}
                        onChange={(event) => onCheck("rapper", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Song Writer</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#song-writer"
                        checked={checked.songwriter}
                        onChange={(event) => onCheck("songwriter", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Studio</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#studio"
                        checked={checked.studio}
                        onChange={(event) => onCheck("studio", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Management</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#management"
                        checked={checked.management}
                        onChange={(event) => onCheck("management", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Band</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#band"
                        checked={checked.band}
                        onChange={(event) => onCheck("band", event)}
                      />
                    }
                  />
                </Grid>
              </div>
              <div>
                <Grid container justify="flex-start" alignItems="flex-start" direction="column">
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Help Wanted</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#help-wanted"
                        checked={checked.helpwanted}
                        onChange={(event) => onCheck("helpwanted", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Collab</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#collab"
                        checked={checked.collab}
                        onChange={(event) => onCheck("collab", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Sale</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#sale"
                        checked={checked.sale}
                        onChange={(event) => onCheck("sale", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Instrument</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#instrument"
                        checked={checked.instrument}
                        onChange={(event) => onCheck("instrument", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Image</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#image"
                        checked={checked.image}
                        onChange={(event) => onCheck("image", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Audio</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#audio"
                        checked={checked.audio}
                        onChange={(event) => onCheck("audio", event)}
                      />
                    }
                  />
                  <FormControlLabel
                    className={classes.label}
                    label={<span className={classes.label}>Video</span>}
                    control={
                      <BlueCheckbox
                        className={classes.checkBox}
                        value="#video"
                        checked={checked.video}
                        onChange={(event) => onCheck("video", event)}
                      />
                    }
                  />
                </Grid>
              </div>
            </Grid>
          ) : null}
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            direction="column"
            className={classes.grid}
          >
            <ImageUploader
              withIcon={false}
              withPreview={true}
              singleImage={true}
              buttonText="Choose Image"
              onChange={(img) => onChangeImage(img)}
              imgExtension={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
            />
            <FormControlLabel
              labelPlacement="start"
              className={classes.formLabel}
              label="Audio"
              control={
                <input
                  className={classes.fileButton}
                  type="file"
                  name="file"
                  onChange={(e) => onChangeAudio(e)}
                />
              }
            />
            <div>
              <InputLabel className={classes.formLabel} variant="outlined">
                Share Your YouTube Video
              </InputLabel>
              <Input
                variant="outlined"
                className={classes.input}
                onChange={(event) => onYoutubeUrl(event)}
                type="text"
                placeholder="Youtube Url"
              />
            </div>
            <div>
              <InputLabel className={classes.formLabel} variant="outlined">
                Add A Message
              </InputLabel>
              <Input
                className={classes.input}
                required={true}
                placeholder="Message"
                onChange={(event) => onEvent(event, setMessage, message)}
                type="text"
                multiline={true}
              />
              <Button className={classes.button} onClick={() => onSubmit()}>
                Post
              </Button>
            </div>
          </Grid>
        </div>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.loadingGrid}
        >
          <img alt="PS" src="../styles/logo.png" className={load.loadingImg} />
          <Typography variant="h2" className={load.loadingText}>
            Posting...
          </Typography>
        </Grid>
      )}
      {!redirect.length ? null : <Redirect to={redirect} />}
    </div>
  );
};

CreatePostMessage.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default CreatePostMessage;
