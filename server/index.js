require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { Users } = require("./db");
const { Op } = require("sequelize");
require("./passport.setup");

const PORT = process.env.PORT || 3000;
const CLIENT_PATH = path.join(__dirname, "../client/dist");
const INDEX_PATH = path.join(__dirname, "../client/dist/index.html");

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

const isAccCreated = (googleId) =>
  Users.findAll({
    where: {
      [Op.and]: [{ googleId }, { username: { [Op.not]: null } }],
    },
  })
    .then((list) => !!list.length)
    .catch((err) => err);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { googleId } = req.user;
    isAccCreated(googleId)
      .then((acc) => {
        if (acc) {
          res.redirect("/home");
        } else {
          res.redirect("/createProfile");
        }
      })
      .catch((err) => res.status(500).send(err));
  }
);

app.post("/createProfile", (req, res) => {
  const addUser = (userId, userInfoObj) => Users.update(userInfoObj, { where: { id: userId } });
  const userInfoObj = req.body;

  const userId = req.session.passport.user.id;
  addUser(userId, userInfoObj)
    .then(() => res.sendStatus(201).redirect("/"))
    .catch(() => res.sendStatus(500));
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

app.get("/*", function (req, res) {
  res.sendFile(path.join(INDEX_PATH), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
