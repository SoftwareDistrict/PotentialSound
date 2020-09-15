import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { navStyles } from "../styles/styles.js";

const Nav = ({ currentUser, toggleMenu }) => {
  const classes = navStyles();

  const logout = () => {
    axios.get("/logout").catch((err) => console.warn("unsucessful logout: ", err));
  };

  return (
    <div className={classes.style} id="mySidenav">
      <Typography onClick={toggleMenu} variant="h5" style={{ color: "white", textAlign: "center" }}>
        Menu
      </Typography>
      <Link onClick={toggleMenu} className={classes.link} to="/home">
        General
      </Link>
      <Link onClick={toggleMenu} className={classes.link} to={"/createChat"}>
        Create Chat
      </Link>
      <Link to="/chats" onClick={toggleMenu} className={classes.link}>
        Chats
      </Link>
      <Link onClick={toggleMenu} className={classes.link} to={`/profile/${currentUser.id}`}>
        My Profile
      </Link>
      <Link
        to={"/"}
        className={classes.link}
        onClick={() => {
          logout();
          toggleMenu();
        }}
      >
        Logout
      </Link>
    </div>
  );
};

Nav.propTypes = {
  currentUser: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Nav;
