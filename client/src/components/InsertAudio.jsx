import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

const InsertAudio = ({ audio, onChangeAudio }) => {
  const uploadAudio = () => {
    let data = new FormData();

    data.append("audio", audio[0], audio[0].name);

    axios
      .post("/api/uploadAudio", data)
      .then(({ data }) => console.info(data))
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <input type="file" name="file" onChange={(e) => onChangeAudio(e)} />
      <button style={{ backgroundColor: "orange" }} onClick={() => console.info(audio)}>
        Checking audio
      </button>
      <button style={{ backgroundColor: "orange" }} onClick={() => uploadAudio()}>
        Upload Audio
      </button>
    </div>
  );
};

InsertAudio.propTypes = {
  audio: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  onChangeAudio: PropTypes.func,
};

export default InsertAudio;
