import React from "react";
import PropTypes from "prop-types";
import { AppBar, Typography, Avatar, Grid } from "@material-ui/core";
import Menu from "./Menu.jsx";
import { feedStyles } from "../styles/styles.js";

const Appbar = ({ currentUser }) => {
  const classes = feedStyles();

  window.addEventListener("click", function (e) {
    const nav = document.getElementById("mySidenav");
    const menu = document.getElementById("menu");
    if (document.getElementById("mySidenav").contains(e.target) || menu.contains(e.target)) {
      console.info("");
    } else {
      nav.style.display = "none";
      menu.style.display = "block";
    }
  });

  return (
    <AppBar position="sticky" className={classes.app}>
      <Grid container justify="space-between" alignItems="flex-end" direction="row">
        <Menu />
        <Typography variant="h5" className={classes.header}>
          PotentialSound
        </Typography>
        <Avatar alt={currentUser.username} src={currentUser.propic} className={classes.avatar} />
      </Grid>
    </AppBar>
  );
};

Appbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Appbar;
