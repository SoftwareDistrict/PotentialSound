import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { Redirect } from "react-router-dom";
import axios from "axios";

const CreateProfile = () => {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [cell, setCell] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState([]);
  const [endPt, setEndPt] = useState("");

  const uploadImg = () => {
    let data = new FormData();

    data.append("image", photo[0], photo[0].name);

    return axios.post("/api/uploadImage", data);
    // .then(({ data }) => console.info(data))
    // .catch((err) => console.warn(err));
  };

  const sendUserProfile = () => {
    return axios.post("/createProfile", {
      username: username,
      city: city,
      cell: cell,
      description: description,
    });
    // .then(({ data }) => console.info(data))
    // .catch((err) => console.warn(err));
  };

  const createProfile = () => {
    // uploadImg();
    axios
      .all([sendUserProfile(), uploadImg()])
      .then((res) => setEndPt(res[0].data.redirectUrl))
      .catch((err) => console.warn(err));
  };

  const onDrop = (picture) => {
    setPhoto(photo.concat(picture));
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <input placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}></input>
      <br />
      <input placeholder="Enter City" onChange={(e) => setCity(e.target.value)}></input>
      <br />
      <input placeholder="Enter Cell" onChange={(e) => setCell(e.target.value)}></input>
      <br />
      <input
        placeholder="Enter Descrition"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <br />
      <ImageUploader
        withIcon={false}
        withPreview={true}
        singleImage={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
      <button onClick={() => createProfile()}>Submit</button>
      {!endPt.length ? null : <Redirect to={`${endPt}`} />}
    </div>
  );
};

export default CreateProfile;
