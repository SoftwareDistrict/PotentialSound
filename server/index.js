require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./db");
require("./passport.setup");
const {
  isAccCreated,
  addUser,
  getCurrentUser,
  getPosts,
  getPoster,
  getPostTags,
} = require("./queries.js");

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
  const userInfoObj = req.body;
  const userId = req.session.passport.user;
  addUser(userId, userInfoObj)
    .then(() => res.sendStatus(201).redirect("/home"))
    .catch(() => res.sendStatus(500));
});

app.put("/updateProfile", (req, res) => {
  const body = req.body;
  res.send(body).status(201);
});

app.get("/feed", (req, res) => {
  getPosts()
    .then((posts) => res.send(posts).status(200))
    .catch((err) => console.warn("could not get all posts", err));
});

app.get("/poster", (req, res) => {
  const { id } = req.body;
  getPoster(id)
    .then((user) => res.send(user).status(200))
    .catch((err) => console.warn("no poster", err));
});

app.get("/posttags", (req, res) => {
  const { id } = req.body;
  getPostTags(id)
    .then((allTags) => res.send(allTags).status(200))
    .catch((err) => console.warn("could not get all tags for post.", err));
});

app.get("/currenUser", (req, res) => {
  const { userId } = req.session.passport.user.id;
  getCurrentUser(userId)
    .then((user) => res.send(user).status(200))
    .catch((err) => console.warn("no currentUser", err));
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
