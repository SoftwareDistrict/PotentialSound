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


module.exports = {
  loginStyles,
};
