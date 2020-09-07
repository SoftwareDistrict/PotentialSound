require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { uploadToS3, uploadAudioToS3 } = require("./s3");
require("./db");
require("./passport.setup");
const {
  isAccCreated,
  getCurrentUser,
  getPosts,
  getThisPost,
  getUsers,
  getTags,
  getMessages,
  getChats,
  getPoster,
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
    .then(() => res.status(200).json({ redirectUrl: "/home" }))
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

app.get("/thispost/:id", (req, res) => {
  const id = req.params.id;
  getThisPost(id)
    .then((post) => res.send(post))
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

app.get("/poster/:id", (req, res) => {
  const id = req.params.id;
  getPoster(id)
    .then((poster) => res.send(poster))
    .catch((err) => console.warn("POSTER", err));
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

app.post("/api/uploadAudio", (req, res) => {
  uploadAudioToS3(req, res)
    .then((url) => res.status(201).send(url))
    .catch((err) => console.warn(err));
});

app.post("/api/uploadImage", (req, res) => {
  uploadToS3(req, res)
    .then((url) => res.status(201).send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/createPostMessage", (req, res) => {
  const { tags, bodyMsg } = req.body;
  bodyMsg["id_user"] = req.session.passport.user;

  addPost(bodyMsg)
    .then((post) => {
      const postId = post.dataValues.id;
      tags.map((tag) => {
        addTags(postId, tag);
      });
      res.status(201).json({ redirectUrl: "/home" });
    })
    .catch((err) => res.status(500).send(err));
});

app.get("*", (req, res) => {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

app.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
