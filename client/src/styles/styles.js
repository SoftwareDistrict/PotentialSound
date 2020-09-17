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

const searchStyles = makeStyles({
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

const createMessageStyles = makeStyles({
  pDiv: {
    height: "100vh",
    backgroundColor: "#2B2D42",
  },
  avatarGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  parentGrid: {
    backgroundColor: "#2B2D42",
  },
  username: {
    backgroundColor: "#EDF2F4",
  },
  header: {
    textAlign: "center",
    color: white,
  },
  text: {
    backgroundColor: "#EDF2F4",
  },
  button: {
    backgroundColor: light,
    color: dark,
  },
  suggestions: {
    backgroundColor: white,
    width: 250,
    fontSize: 14,
  },
  list: {
    listStyle: "none",
  },
  chatInput: {
    border: "4px solid black",
    width: 250,
    height: 30,
    fontSize: 14,

    backgroundColor: "white",
  },

  chatText: {
    border: "4px solid black",
    fontSize: 14,

    backgroundColor: "white",
  },
  selectedUser: {
    color: dark,
    fontWeight: "bold",
  },
});

const chatEntryStyles = makeStyles({
  avatar: {
    height: 50,
    width: 50,
    variant: "circle",
  },
  avatarGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#white",
  },
  pDiv: {
    background: light,
    boxShadow: "0px 0px 0px 4px #8D99AE",
    border: "5px solid",
    borderColor: "white",
    margin: "0 auto",
    borderTopLeftRadius: "5px",
    bordeBottomRightRadius: "5px",
    position: "relative",
    alignItems: "center",
    height: "100px",
  },
});
const chatStyles = makeStyles({
  header: {
    textAlign: "center",
    color: white,
  },
  button: {
    backgroundColor: light,
    color: dark,
  },
  chatText: {
    border: "4px solid black",
    fontSize: 14,

    backgroundColor: "white",
  },
  messageContainer: {
    backgroundColor: white,
    padding: "7px",
    width: "350px",
    overflow: "auto",
    maxHeight: "468px",
  },
  callButton: {
    backgroundColor: light,
    color: dark,
    position: "absolute",
    bottom: "18px",
    right: "5px",
  },
});
module.exports = {
  dark,
  light,
  white,
  loginStyles,
  postStyles,
  feedStyles,
  searchStyles,
  menuStyles,
  createMessageStyles,
  chatEntryStyles,
  chatStyles,
};
