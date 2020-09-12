import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import LiveEntry from "./LiveEntry.jsx";
const LiveStreams = ({ menu }) => {
  const [lives, setLives] = useState([]);

  useEffect(() => {
    axios
      .get("/getAllLives")
      .then((data) => {
        setLives(data.data);
      })
      .catch((err) => console.warn("could not get all users in Lives.", err));
  }, [lives]);

  return (
    <div>
      {menu}
      <div>
        <Link
          to="createLiveStream"
          style={{ textAlign: "center", color: "black", textDecoration: "none" }}
        >
          <h3 style={{ textAlign: "center" }}>Create a LiveStream</h3>
        </Link>
        <h1 style={{ textAlign: "center" }}>Lives</h1>
        {lives.map((live) => (
          <LiveEntry
            key={live.id}
            id={live.id}
            id_chat={live.id_user}
            name={live.name}
            desc={live.desc}
          />
        ))}
      </div>
    </div>
  );
};

LiveStreams.propTypes = {
  currentUser: PropTypes.object.isRequired,
  menu: PropTypes.element,
};

export default LiveStreams;
