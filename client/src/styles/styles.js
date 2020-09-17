import { makeStyles } from "@material-ui/core/styles";

const dark = "#2B2D42";
const light = "#8D99AE";
const white = "#EDF2F4";

const loginStyles = makeStyles({
  loginContainer: {
    height: "100%",
    width: "100%",
    background: dark,
    paddingTop: 60,
    paddingBottom: 50,
  },
  header: {
    color: light,
    margin: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: "#037bfc",
    height: 53,
    width: 250,
    borderRadius: 0,
    padding: 0,
    color: "white",
    fontSize: 22,
    marginTop: 60,
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
});

const searchStyles = makeStyles({
  queryDisplay: {
    textAlign: "center",
    color: white,
  },
  input: {
    border: "3px solid black",
    width: 250,
    height: 30,
    fontSize: 14,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: white,
  },
  button: {
    borderRadius: 0,
    border: "2px solid black",
    background: light,
    padding: 4,
    marginBottom: 10,
  },
  icon: {
    fontSize: 25,
    fontWeight: "bold",
    color: dark,
  },
  suggestions: {
    color: white,
  },
});

const postStyles = makeStyles({
  avatar: {
    width: 80,
    height: 70,
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
    fontSize: 16,
    textDecoration: "none",
    color: white,
  },
  tags: {
    fontSize: 14,
    textDecoration: "none",
    color: white,
    marginTop: 5,
  },
  anchor: {
    textDecoration: "none",
    textAlign: "left",
    marginTop: 5,
    fontSize: 16,
    color: "#037bfc",
  },
});

const feedStyles = makeStyles({
  avatar: {
    height: 60,
    width: 60,
  },
  feed: {
    backgroundColor: light,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  app: {
    backgroundColor: light,
    padding: 10,
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: light,
    color: dark,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
    align: "center",
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
  },
  header: {
    color: dark,
    fontWeight: "bold",
  },
});

const menuStyles = makeStyles({
  icon: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    borderRadius: 0,
    padding: 0,
  },
  iconClose: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  style: {
    position: "fixed",
    padding: 10,
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
    fontSize: 30,
    marginTop: 40,
  },
});

const profileStyle = makeStyles({
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: light,
    color: dark,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
    align: "center",
    fontWeight: "bold",
  },
  avatar: {
    width: "120px",
    height: "120px",
    position: "absolute",
    top: "50px",
    left: "25px",
    variant: "circle",
  },
});

const createPostStyles = makeStyles({
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: dark,
    color: white,
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 3,
    marginBottom: 2,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
    align: "center",
  },
  tagButton: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: light,
    color: dark,
    fontSize: 18,
    padding: 10,
    margin: 10,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
  },
  grid: {
    paddingTop: 10,
    background: light,
    color: white,
  },
  tagGrid: {
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: white,
  },
  formLabel: {
    fontSize: 16,
    color: dark,
  },
  checkBox: {
    color: white,
    boderRadius: 0,
    padding: 0,
    border: "1px",
  },
  input: {
    border: "3px solid black",
    width: 250,
    height: "100%",
    fontSize: 14,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 5,
    backgroundColor: white,
  },
  fileButton: {
    marginLeft: 5,
    background: dark,
    color: white,
  },
  loadingGrid: {
    marginTop: 250,
  },
  loadingText: {
    fontSize: 60,
    color: white,
  },
  loadingImg: {
    height: 180,
    width: 160,
  },
});

module.exports = {
  dark,
  light,
  white,
  loginStyles,
  searchStyles,
  postStyles,
  feedStyles,
  menuStyles,
  profileStyle,
  createPostStyles,
};
