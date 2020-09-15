import { makeStyles } from "@material-ui/core/styles";

const dark = "#2B2D42";
const light = "#8D99AE";
const white = "#EDF2F4";

const loginStyles = makeStyles({
  box1: {
    height: "100%",
    width: "100%",
    background: dark,
    paddingTop: 10,
    paddingBottom: 10,
  },
  box2: {
    background: dark,
    height: "85%",
    width: "85%",
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    color: light,
    marginTop: 20,
    marginBotom: 10,
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: "#037bfc",
    height: 74,
    width: 250,
    borderRadius: 0,
    padding: 0,
    marginBottom: 200,
    color: "white",
    fontSize: 22,
    marginTop: 60,
  },
});

const navStyles = makeStyles({
  style: {
    position: "fixed",
    left: 0,
    width: 180,
    height: "60%",
    backgroundColor: light,
    border: "4px solid black",
    zIndex: 20,
    borderRadius: 0,
    display: "none",
  },
  link: {
    color: white,
    textDecoration: "none",
    float: "left",
    fontSize: "30px",
    marginTop: "10px",
    marginBottom: "40px",
  },
});

const postStyles = makeStyles({
  avatar: {
    width: 80,
    height: 90,
    margin: 5,
    maxWidth: "100%",
    maxHeight: "100%",
    float: "left",
  },
  grid: {
    border: "4px solid black",
    marginTop: 10,
    marginBottom: 10,
    width: "98%",
    background: dark,
    minHeight: 120,
  },
  grid2: {
    width: "70%",
  },
  username: {
    fontSize: 18,
    textDecoration: "none",
    color: white,
  },
  tags: {
    fontSize: 16,
    textDecoration: "none",
    color: white,
    marginTop: 5,
  },
  anchor: {
    textDecoration: "none",
    textAlign: "left",
    marginTop: 5,
    fontSize: 18,
    color: "#037bfc",
  },
  iframe: {
    width: "100%",
    height: 120,
    frameBorder: 0,
  },
});

const feedStyles = makeStyles({
  avatar: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 80,
    width: 80,
  },
  feed: {
    backgroundColor: light,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: dark,
    color: white,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
    align: "center",
  },
  link: {
    textDecoration: "none",
  },
  header: {
    color: light,
    padding: "0 0 60px 10px",
  },
});

const searchStyles = makeStyles({
  input: {
    border: "3px solid black",
    width: 250,
    height: 30,
    fontSize: 14,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 0,
    border: "2px solid black",
    background: light,
    padding: 4,
  },
  icon: {
    fontSize: 25,
    fontWeight: "bold",
    color: white,
  },
});

const menuStyles = makeStyles({
  icon: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    display: "block",
  },
  button: {
    borderRadius: 0,
    // border: "2px solid black",
    // background: light,
    // padding: 4,
  },
});

module.exports = {
  dark,
  light,
  white,
  loginStyles,
  navStyles,
  postStyles,
  feedStyles,
  searchStyles,
  menuStyles,
};
