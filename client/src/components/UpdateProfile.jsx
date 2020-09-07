import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";

const UpdateProfile = ({ currentUser, menu, getCurrentUser }) => {
  const [newUser, setNewUser] = useState("Previous Username");
  const [newCity, setNewCity] = useState("Previous City");
  const [newCell, setNewCell] = useState("Previous Cell");
  const [newDescription, setNewDescription] = useState("Previous Description");
  const [photo, setPhoto] = useState([]);
  const [endPt, setEndPt] = useState("");
  const [load, setLoad] = useState(false);

  const uploadImg = () => {
    let data = new FormData();

    data.append("image", photo[0], photo[0].name);

    return axios.post("/api/uploadImageUpdate", data);
  };

  const sendUpdates = () => {
    const data = {
      username: newUser,
      city: newCity,
      cell: newCell,
      description: newDescription,
    };

    if(newUser === "Previous Username") {
      data["username"] = currentUser.username;
    }
    if(newCity === "Previous City") {
      data["city"] = currentUser.city;
    }
    if(newCell === "Previous Cell") {
      data["cell"] = currentUser.cell;
    }
    if(newDescription === "Previous Description") {
      data["description"] = currentUser.description;
    }

    return axios.post("/profileUpdate", data);
  };

  const updateProfile = () => {
    setLoad(true);
    axios
      .all([sendUpdates(), uploadImg()])
      .then((res) => {
        setEndPt(res[0].data.redirectUrl);
        setLoad(false);
      })
      .then(() => getCurrentUser())
      .catch((err) => console.warn(err));
  };

  const onDrop = (picture) => {
    setPhoto(photo.concat(picture));
  };

  return (
    <div>
      {load === false ? (
        <div>
          {menu}
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
          <ImageUploader
            withIcon={false}
            withPreview={true}
            singleImage={true}
            buttonText="Select Image"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png"]}
            maxFileSize={5242880}
          />
          <button style={{ backgroundColor: "#eb8c34", marginTop: "30px" }} type="button" onClick={() => updateProfile()}>
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
  menu: PropTypes.element,
  getCurrentUser: PropTypes.func.isRequired,
};

export default UpdateProfile;
