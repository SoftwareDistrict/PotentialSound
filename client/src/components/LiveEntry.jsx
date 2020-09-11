import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LiveEntry = ({ name, id }) => {
  return (
    <Link to={`/liveStream/${id}`} style={{ textDecoration: "none", color: "orange" }}>
      <div
        className="live"
        style={{
          border: "2px solid black",
          width: "350px",
          height: "100px",
          margin: "0 auto",
          backgroundColor: "#3F3D3D",
          position: "relative",
          alignItems: "center",
        }}
      >
        <div
          style={{
            resize: "both",
            overflow: "auto",
            width: "350px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          <label>Name of live:</label>
          <div>{name}</div>
        </div>
      </div>
    </Link>
  );
};

LiveEntry.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
};

export default LiveEntry;
