import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = ({ currentUser, toggleMenu }) => {
  const style = {
    position: "fixed",
    left: 0,
    width: "180px",
    height: "100%",
    backgroundColor: "#3F3D3D",
    zIndex: 20,
    borderRadius: "15px",
    display: "none",
  };
  const linkStyle = { color: "orange", textDecoration: "none", float: "left", fontSize: "30px", marginTop: "10px", marginBottom: "40px" };
  return (
    <div style={style} id="mySidenav" className="navbar">
      <h2 onClick={toggleMenu} style={{ textAlign: "center" }}>
        Menu
      </h2>
      <Link onClick={toggleMenu} style={linkStyle} to="/home">
        General
      </Link>
      <Link to="chats" onClick={toggleMenu} style={linkStyle}>
        Chats
      </Link>
      <Link onClick={toggleMenu} style={linkStyle}>
        Start Video Chat
      </Link>{" "}
      <Link onClick={toggleMenu} style={linkStyle} to={`/profile/${currentUser.id}`}>
        My Profile
      </Link>
      <div style={{ fontSize: "30px", fontWeight: "bold" }} onClick={toggleMenu}>
        Close
      </div>
    </div>
  );
};

Nav.propTypes = {
  currentUser: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Nav;
