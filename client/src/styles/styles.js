import { makeStyles } from "@material-ui/core/styles";

const loginStyles = makeStyles({
  box1: {
    height: "100%",
    width: "100%",
    background: "#FFE6B5",
    paddingTop: 10,
    paddingBottom: 10,
  },
  box2: {
    background: "black",
    height: "85%",
    width: "85%",
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    color: "#E95A01",
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
    width: "180px",
    height: "100%",
    backgroundColor: "#3F3D3D",
    borderColor: "black",
    zIndex: 20,
    borderRadius: "15px",
    display: "none",
  },
  link: {
    color: "#E95A01",
    textDecoration: "none",
    float: "left",
    fontSize: "30px",
    marginTop: "10px",
    marginBottom: "40px",
  },
});

const postStyles = makeStyles({
  avatar: {
    width: 100,
    height: 100,
    paddingLeft: 5,
    alignSelf: "left",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  grid: {
    border: "2px solid black",
    margin: "0 auto",
    marginTop: 10,
    marginBottom: 10,
    background: "#3F3D3D",
  },
  linkusername: {
    height: 20,
    textAlign: "left",
    fontSize: 20,
    textDecoration: "none",
    color: "#E95A01",
  },
  linkmsg: {
    height: 60,
    textAlign: "left",
    fontSize: 14,
    textDecoration: "none",
    color: "#E95A01",
  },
  tags: {
    height: 20,
    textAlign: "left",
    marginTop: 10,
    fontSize: 14,
    color: "#E95A01",
  },
  youtube: {
    marginLeft: 110,
  },
});

const feedStyles = makeStyles({
  avatar: {
    height: 80,
    width: 80,
    float: "right",
  },
  feed: {
    backgroundColor: "black",
    padding: 20,
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: "#E95A01",
    color: "black",
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 0,
    borderColor: "black",
    align: "center",
  },
  link: {
    textDecoration: "none",
  },
  header: {
    color: "#E95A01",
    padding: "30px 0 10px 20px",
  },
});

const searchStyles = makeStyles({
  input: {
    borderColor: "black",
    width: 250,
    height: 30,
    fontSize: 14,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    borderColor: "black",
    borderRadius: 0,
    background: "#E95A01",
    marginBottom: 3,
    padding: 6,
    fontSize: 28,
  },
});

module.exports = {
  loginStyles,
  navStyles,
  postStyles,
  feedStyles,
  searchStyles,
};
