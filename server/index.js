require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { uploadToS3 } = require("./s3");
require("./db");
require("./passport.setup");
const {
  isAccCreated,
  getCurrentUser,
  getPosts,
  getUsers,
  getTags,
  getMessages,
  getChats,
  addPost,
  addUser,
  addTags,
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
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
});

app.put("/updateProfile", (req, res) => {
  const body = req.body;
  res.send(body);
});

app.get("/feed", (req, res) => {
  getPosts()
    .then((posts) => res.send(posts))
    .catch((err) => res.status(500).send(err));
});

app.get("/users", (req, res) => {
  getUsers()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err));
});

app.get("/posttags", (req, res) => {
  getTags()
    .then((allTags) => res.send(allTags))
    .catch((err) => res.status(500).send(err));
});

app.get("/currentUser", (req, res) => {
  const userId = req.session.passport.user;
  getCurrentUser(userId)
    .then((user) => res.send(user.dataValues))
    .catch((err) => res.status(500).send(err));
});

app.get("/messages", (req, res) => {
  getMessages()
    .then((msgs) => res.send(msgs))
    .catch((err) => res.status(500).send(err));
});

app.get("/allchats", (req, res) => {
  getChats()
    .then((chats) => res.send(chats))
    .catch((err) => res.status(500).send(err));
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.post("/api/uploadImageUpdate", (req, res) => {
  uploadToS3(req, res)
    .then((url) => res.status(201).send(url))
    .catch((err) => console.warn(err));
});

app.post("/api/uploadImagePost", (req, res) => {
  uploadToS3(req, res)
    .then((url) => res.status(201).send(url))
    .catch((err) => console.warn(err));
});

app.post("/api/uploadImage", (req, res) => {
  uploadToS3(req, res)
    .then((url) => res.status(201).send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/createPostMessage", (req, res) => {
  const { tags, message } = req.body;
  const postObj = {
    id_user: req.session.passport.user,
    message: message,
  };
  addPost(postObj)
    .then((post) => {
      const postId = post.dataValues.id;
      tags.map((tag) => {
        addTags(postId, tag);
      });
    })
    .catch((err) => res.status(500).send(err));
});

app.get("*", (req, res) => {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

app.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
