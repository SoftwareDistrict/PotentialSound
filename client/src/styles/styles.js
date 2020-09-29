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
    color: white,
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
    "&:hover": {
      backgroundColor: "#037bfc",
      "@media (hover: none)": {
        backgroundColor: "#037bfc",
        "&:active": {
          backgroundColor: "#037bfc",
        },
      },
    },
    "&:active": {
      backgroundColor: "#037bfc",
    },
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
  suggestions: {
    color: white,
  },
  button: {
    borderRadius: 0,
    border: "2px solid black",
    background: light,
    padding: 4,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
  },
  icon: {
    fontSize: 25,
    fontWeight: "bold",
    color: dark,
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
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
  },
  backButton: {
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
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: dark,
      "@media (hover: none)": {
        backgroundColor: dark,
        "&:active": {
          backgroundColor: dark,
        },
      },
    },
    "&:active": {
      backgroundColor: dark,
    },
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
    color: white,
  },
  button: {
    borderRadius: 0,
    padding: 0,
  },
  iconClose: {
    fontSize: 50,
    fontWeight: "bold",
    color: white,
  },
  style: {
    position: "fixed",
    padding: 10,
    left: 0,
    width: 180,
    height: "70%",
    backgroundColor: light,
    border: "4px solid black",
    zIndex: 20,
    borderRadius: 0,
    display: "none",
    marginTop: 80,
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
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
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
    backgroundColor: white,
    paddingLeft: 10,
  },
  chatText: {
    border: "4px solid black",
    fontSize: 14,
    backgroundColor: white,
    width: "90%",
    paddingLeft: 10,
  },
  selectedUser: {
    color: dark,
    fontWeight: "bold",
  },
  box: {
    color: white,
    backgroundColor: light,
    border: "4px solid black",
    width: "75%",
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
    color: white,
    width: "350px",
    textAlign: "center",
    fontSize: "20px",
    marginBottom: 5,
  },
  pDiv: {
    background: light,
    boxShadow: "0px 0px 0px 4px #8D99AE",
    border: "5px solid",
    borderColor: white,
    position: "relative",
    alignItems: "center",
    height: "100px",
  },
  link: {
    textDecoration: "none",
    color: dark,
  },
});

const chats = makeStyles({
  header: {
    color: white,
    marginTop: 10,
    marginBottom: 10,
  },
});

const chatStyles = makeStyles({
  header: {
    color: white,
    margin: 10,
  },
  header2: {
    color: dark,
    fontSize: 16,
    marginBottom: 25,
  },
  header3: {
    color: dark,
    fontSize: 20,
  },
  button: {
    backgroundColor: light,
    color: dark,
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
  },
  fileButton: {
    padding: 5,
    backgroundColor: light,
  },
  chatText: {
    border: "4px solid black",
    width: "94%",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: white,
  },
  messageContainer: {
    backgroundColor: white,
    padding: 7,
    width: 350,
    overflow: "auto",
    maxHeight: 300,
  },
});

const messageStyles = makeStyles({
  messageDiv: {
    border: `3px solid ${light}`,
    marginTop: 1,
    marginBottom: 2,
    padding: 5,
    width: "98%",
    background: dark,
    minHeight: 100,
  },
  grid2: {
    width: "65%",
  },
  img: {
    width: 100,
    height: 80,
    margin: 5,
    maxWidth: "100%",
    maxHeight: "100%",
    float: "left",
  },
  username: {
    textAlign: "left",
    fontSize: 20,
    color: white,
    fontWeight: "bold",
    marginBottom: 3,
  },
  message: {
    textAlign: "left",
    fontSize: 18,
    color: white,
  },
  time: {
    fontSize: 16,
    marginTop: 5,
    color: white,
  },
  msgImg: {
    width: 100,
    height: 80,
  },
  msgItemCon: {
    padding: 5,
  },
});

const profileStyle = makeStyles({
  mainContainer: {
    backgroundColor: white,
    padding: 20,
    marginTop: 30,
    maxWidth: "80%",
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: light,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
    fontWeight: "bold",
    fontSize: 16,
    color: dark,
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
  },
  link: {
    textDecoration: "none",
    marginRight: "10px",
    marginLeft: "10px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    position: "relative",
    variant: "circle",
  },
  container: {
    background: dark,
  },
  username: {
    color: white,
  },
  email: {
    marginTop: 25,
    marginBottom: 10,
    color: white,
    fontSize: 16,
  },
  textStyle: {
    marginBottom: 10,
    color: white,
    fontSize: 16,
  },
  iconContainer: {
    fontSize: 35,
    marginTop: 20,
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
    "&:hover": {
      backgroundColor: dark,
      "@media (hover: none)": {
        backgroundColor: dark,
        "&:active": {
          backgroundColor: dark,
        },
      },
    },
    "&:active": {
      backgroundColor: dark,
    },
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
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
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
    paddingBottom: 15,
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
});

const loadStyles = makeStyles({
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
    marginTop: 220,
  },
});

const profileFormStyles = makeStyles({
  header: {
    color: white,
  },
  header2: {
    color: white,
    marginTop: 30,
  },
  formLabel: {
    fontSize: 16,
    color: dark,
  },
  formLabelImage: {
    fontSize: 16,
    color: dark,
    marginTop: 20,
    marginBottom: 22,
  },
  input: {
    border: "3px solid black",
    width: 250,
    height: "100%",
    fontSize: 14,
    paddingLeft: 10,
    marginTop: 22,
    color: "black",
    backgroundColor: white,
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    backgroundColor: dark,
    marginTop: 20,
    background: light,
    color: white,
    fontSize: 14,
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    margin: 10,
    border: "3px solid black",
    borderRadius: 0,
    borderColor: "black",
    "&:hover": {
      backgroundColor: dark,
      "@media (hover: none)": {
        backgroundColor: dark,
        "&:active": {
          backgroundColor: dark,
        },
      },
    },
    "&:active": {
      backgroundColor: dark,
    },
  },
  container: {
    background: light,
    margin: 10,
    marginTop: 20,
    padding: 10,
  },
});

const fullPostStyles = makeStyles({
  mainContainer: {
    background: white,
    marginTop: 30,
    padding: 10,
  },
  container: {
    background: dark,
    border: "3px solid black",
    color: white,
    paddingBottom: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    margin: 10,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  text: {
    fontSize: 20,
    margin: 10,
    color: white,
  },
  link: {
    textDecoration: "none",
  },
  input: {
    border: "3px solid black",
    width: 250,
    height: "100%",
    fontSize: 16,
    paddingLeft: 10,
    color: "black",
    backgroundColor: white,
  },
  button: {
    variant: "contained",
    disableFocusRipple: true,
    disableRipple: true,
    background: light,
    color: dark,
    fontSize: 14,
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    border: "2px solid black",
    borderRadius: 0,
    borderColor: "black",
    marginBottom: 3,
    "&:hover": {
      backgroundColor: light,
      "@media (hover: none)": {
        backgroundColor: light,
        "&:active": {
          backgroundColor: light,
        },
      },
    },
    "&:active": {
      backgroundColor: light,
    },
  },
  header: {
    color: white,
    marginTop: 20,
  },
  header2: {
    color: "#037bfc",
    marginTop: 20,
  },
});

const body = makeStyles({
  body: {
    background: dark,
    padding: 10,
  },
});

module.exports = {
  dark,
  light,
  white,
  body,
  loginStyles,
  searchStyles,
  postStyles,
  feedStyles,
  menuStyles,
  createMessageStyles,
  chatEntryStyles,
  chats,
  chatStyles,
  messageStyles,
  profileStyle,
  createPostStyles,
  loadStyles,
  profileFormStyles,
  fullPostStyles,
};
