import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CreateLiveStream = ({ menu, currentUser }) => {
  const nameBox = useRef();
  const descriptionBox = useRef();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState([]);

  const onSubmit = () => {
    let obj = { name: name, desc: desc, id_user: currentUser.id };
    axios
      .post("/createLiveStream", obj)
      .then(() => console.info("sucessful post of livestream"))
      .catch((err) => console.info(err));
  };

  const onChange = (event, setFunc) => {
    let value = event.target.value;
    setFunc(value);
  };

  return (
    <div>
      {menu}
      <div>
        <h3>Create a Live Stream</h3>
        <label>Name:</label>

        <input
          ref={nameBox}
          style={{ width: "70%" }}
          onChange={(event) => onChange(event, setName)}
          placeholder="Name"
        />
        <br />
        <label>What is this live about?!?:</label>
        <input
          onChange={(event) => onChange(event, setDesc)}
          ref={descriptionBox}
          style={{ width: "70%" }}
          placeholder="Description"
        />
        <br />
        <button onClick={onSubmit} style={{ marginLeft: "5px", backgroundColor: "#eb8c34" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

CreateLiveStream.propTypes = {
  menu: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default CreateLiveStream;
