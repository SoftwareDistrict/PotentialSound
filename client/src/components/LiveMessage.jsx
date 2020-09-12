import React from "react";
import PropTypes from "prop-types";

const LiveMessage = ({ name, message }) => {
  return (
    <div>
      <label>
        {`${name}:`}
        <p>{message}</p>
      </label>
    </div>
  );
};
LiveMessage.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default LiveMessage;
