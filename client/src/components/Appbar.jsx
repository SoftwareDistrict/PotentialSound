import React from "react";
import PropTypes from "prop-types";
import { AppBar, Typography, Avatar, Grid } from "@material-ui/core";
import Menu from "./Menu.jsx";
import { feedStyles } from "../styles/styles.js";

const Appbar = ({ currentUser }) => {
  const classes = feedStyles();

  return (
    <AppBar position="static" className={classes.app}>
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
