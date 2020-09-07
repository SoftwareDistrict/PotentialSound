import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { Redirect } from "react-router-dom";
import axios from "axios";

const style = {
  margin: "10px",
  display: "block",
};

const CreateProfile = () => {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [cell, setCell] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState([]);
  const [endPt, setEndPt] = useState("");
  const [load, setLoad] = useState(false);

  const uploadImg = () => {
    let data = new FormData();

    data.append("image", photo[0], photo[0].name);

    return axios.post("/api/uploadImage", data);
  };

  const sendUserProfile = () => {
    return axios.post("/createProfile", {
      username: username,
      city: city,
      cell: cell,
      description: description,
    });
  };

  const createProfile = () => {
    setLoad(true);
    axios
      .all([sendUserProfile(), uploadImg()])
      .then((res) => {
        setEndPt(res[0].data.redirectUrl);
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

export default CreateProfile;
