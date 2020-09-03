require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./db");
require("./passport.setup");

const PORT = process.env.PORT || 3000;
const CLIENT_PATH = path.join(__dirname, "../client/dist");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(CLIENT_PATH));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) =>
  res.redirect("/home")
);

app.post("/createProfile", (req, res) => {
  const body = req.body;
  res.send(body).status(201);
});

app.put("/updateProfile", (req, res) => {
  const body = req.body;
  res.send(body).status(201);
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

app.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
