import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { navStyles, menuStyles } from "../styles/styles.js";
import { IconButton } from "@material-ui/core";
import { MenuOpenOutlinedIcon } from "@material-ui/icons";

const Nav = ({ currentUser }) => {
  const classes = navStyles();
  const cl = menuStyles();

  const toggleMenu = () => {
    const nav = document.getElementById("mySidenav");
    const menu = document.getElementById("menu");
    if (nav.style.display === "none") {
      nav.style.display = "block";
      menu.style.display = "none";
    } else {
      nav.style.display = "none";
      menu.style.display = "block";
    }
  };

  const logout = () => {
    axios.get("/logout").catch((err) => console.warn("unsucessful logout: ", err));
  };

  return (
    <div className={classes.style} id="mySidenav">
      <IconButton id="mySidenav" onClick={toggleMenu} className={cl.button}>
        <MenuOpenOutlinedIcon className={cl.icon} />
      </IconButton>
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
