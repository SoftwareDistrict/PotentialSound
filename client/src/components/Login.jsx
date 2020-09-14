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
      className={classes.box1}
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Grid item className={classes.box2} align="center">
        <Typography variant={matches ? "h4" : "h1"} className={classes.header}>
          Welcome To PotentialSound
          <img
            id="logo"
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
          <img
            id="google"
            src="https://tinyurl.com/y6kf4vx4"
            style={{ height: "70px", width: "70px", marginRight: "10px" }}
          />
          Sign in with Google
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Login;
