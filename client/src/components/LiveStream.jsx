import React from "react";
import PropTypes from "prop-types";

const LiveStream = ({ menu }) => {
  return (
    <div>
      {menu}
      <div style={{ width: "350px", overflow: "hidden" }}>
        <h1 style={{ textAlign: "center" }}>Live</h1>
      </div>
    </div>
  );
};

LiveStream.propTypes = {
  menu: PropTypes.element,
};

export default LiveStream;
