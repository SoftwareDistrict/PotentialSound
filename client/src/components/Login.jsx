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
      <Typography variant={matches ? "h4" : "h1"} className={classes.header}>
        Welcome To PotentialSound
        <img
          alt="PS"
          src="../styles/logo.png"
          style={
            matches
              ? { height: "90px", width: "90px", marginLeft: "10px" }
              : { height: "190px", width: "190px", margiLeft: "10px" }
          }
        />
      </Typography>
      <Typography variant={matches ? "h6" : "h3"} className={classes.header}>
        {"Where You're Bound To Be Found!"}
      </Typography>
      <IconButton className={classes.button} href="/google">
        <img alt="G" src="https://tinyurl.com/y6kf4vx4" className={classes.icon} />
        Sign in with Google
      </IconButton>
    </Grid>
  );
};

export default Login;
