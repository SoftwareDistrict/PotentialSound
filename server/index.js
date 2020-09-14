require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { uploadToS3, uploadAudioToS3 } = require("./s3");
const socketIo = require("socket.io");
const http = require("http");
const userInstagram = require("user-instagram");
require("./db");
require("./passport.setup");
const {
  isAccCreated,
  getCurrentUser,
  getPosts,
  getThisPost,
  getUsers,
  getTags,
  getChats,
  getPoster,
  addPost,
  addUser,
  addTags,
  getUsername,
  addMessage,
  getMessagesForChat,
  createJoin,
  createChat,
  sendMessage,
  search,
  searchPostByUser,
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

//Socket.io==============================================================

const server = http.createServer(app);
const io = socketIo(server);
const users = {};
const socketToRoom = {};

io.on("connection", (socket) => {
  let chatid = null;
  console.info("io is conneceted");
  socket.on("sending", function (data) {
    addMessage(data).then(() => {
      chatid = data.id_chat;
      getMessagesForChat(data.id_chat).then((data) => {
        socket.emit("receive", { data: { array: data, id_chat: chatid } });
      });
    });
    if (data == "exit") {
      socket.disconnect(console.info("sender disconnected"));
    }
  });

  socket.on("getMessages", function (data) {
    let chatid = data;
    console.info(data, "get messages");
    getMessagesForChat(data).then((data) => {
      socket.emit("receive", { data: { array: data, id_chat: chatid } });
    });
  });

  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

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

app.get("/searchfeed/:id", (req, res) => {
  const id = req.params.id;
  search(id)
    .then((posts) => res.send(posts))
    .catch((err) => res.status(500).send(err));
});

app.get("/searchfeedbyuser/:id", (req, res) => {
  const id = req.params.id;
  searchPostByUser(id)
    .then((posts) => res.send(posts))
    .catch((err) => res.status(500).send(err));
});

app.post("/profileUpdate", (req, res) => {
  const userInfoObj = req.body;
  const userId = req.session.passport.user;
  addUser(userId, userInfoObj)
    .then(() => res.status(200).json({ redirectUrl: `/profile/${userId}` }))
    .catch((err) => res.status(500).send(err));
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

app.get("/instagram/:id", (req, res) => {
  const userHandle = req.params.id;
  if (userHandle) {
    userInstagram(userHandle)
      .then((data) => {
        console.info(data.posts.slice(0, 6), userHandle);
        res.send(data.posts.slice(0, 6));
      })
      .catch((err) => res.send(err));
  }
});

app.get("/currentUser", (req, res) => {
  const userId = req.session.passport.user;
  getCurrentUser(userId)
    .then((user) => res.send(user.dataValues))
    .catch((err) => res.status(500).send(err));
});

app.post("/createChat", (req, res) => {
  createChat()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

app.post("/sendMessage", (req, res) => {
  const body = req.body;
  sendMessage(body)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
});

app.post("/createJoin", (req, res) => {
  const body = req.body;
  createJoin(body)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
});

app.get("/poster/:id", (req, res) => {
  const id = req.params.id;
  getPoster(id)
    .then((poster) => res.send(poster))
    .catch((err) => console.warn("POSTER", err));
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
      tags.map((tag) => addTags(postId, tag));
      res.status(201).json({ redirectUrl: "/home" });
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/getallchats", (req, res) => {
  getChats()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/viewOtherProfiles/:id", (req, res) => {
  const user = req.params.id;
  getUsername(user)
    .then((data) => {
      const { instaHandle } = data.dataValues;
      console.info(instaHandle);
      if (instaHandle) {
        userInstagram(instaHandle)
          .then((insta) => {
            console.info(insta.posts.slice(0, 6), instaHandle);
            res.send([data.dataValues, insta.posts.slice(0, 6)]);
          })
          .catch((err) => res.send(err));
      } else {
        res.send(data.dataValues);
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.get("*", (req, res) => {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

server.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
