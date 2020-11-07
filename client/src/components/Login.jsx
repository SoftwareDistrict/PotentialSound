import React from "react";
import { useMediaQuery, Grid, IconButton, Typography } from "@material-ui/core";
import { loginStyles } from "../styles/styles.js";
import { useTheme } from "@material-ui/core/styles";

const Login = () => {
  const classes = loginStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Grid
      className={classes.loginContainer}
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Typography variant={matches ? "h4" : "h2"} className={classes.header}>
        Welcome To
      </Typography>
      <Typography variant={matches ? "h3" : "h2"} className={classes.header}>
        PotentialSound
      </Typography>
      <Typography variant={matches ? "h6" : "h5"} className={classes.header2}>
        {"Where You're Bound To Be Found!"}
      </Typography>
      <IconButton className={classes.button} href="/google">
        <img alt="G" src="https://tinyurl.com/y6kf4vx4" className={classes.icon} />
        Sign in with Google
      </IconButton>
      <div className={classes.textDiv}>
        ------------------------------ OR ------------------------------
      </div>
      <IconButton className={classes.textButton} href="/google">
        Sign Up
      </IconButton>
    </Grid>
  );
};

export default Login;
