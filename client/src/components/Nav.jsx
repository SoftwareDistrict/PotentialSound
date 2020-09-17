import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { menuStyles } from "../styles/styles.js";
import { IconButton, Grid } from "@material-ui/core";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";

const Nav = ({ currentUser }) => {
  const classes = menuStyles();

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
      <Grid container justify="flex-end" alignItems="flex-start" direction="row">
        <IconButton id="mySidenav" onClick={toggleMenu} className={classes.button}>
          <MenuOpenOutlinedIcon className={classes.iconClose} />
        </IconButton>
      </Grid>
      <Grid container justify="center" alignItems="flex-start" direction="column">
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
      </Grid>
    </div>
  );
};

Nav.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Nav;
