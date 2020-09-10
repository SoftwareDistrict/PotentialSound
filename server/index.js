require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { uploadToS3, uploadAudioToS3 } = require("./s3");
const socketIo = require("socket.io");
const http = require("http");
require("./db");
const { Chats, ChatJoin, Messages } = require("./db");
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
  // startChat,
  addMessage,
  getMessagesForChat,
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
const rooms = {};

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

  socket.on("joinCall", (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].push(socket.id);
    } else {
      rooms[roomId] = [socket.id];
    }
    const otherUser = rooms[roomId].find((id) => id !== socket.id);

    if (otherUser) {
      socket.emit("otherUser", otherUser);
      socket.to(otherUser).emit("userJoined", socket.id);
    }
  });

  socket.on("offer", (payload) => io.to(payload.target).emit("offer", payload));

  socket.on("answer", (payload) => io.to(payload.target).emit("answer", payload));

  socket.on("ice-candidate", (incoming) => io.to(incoming.target).emit("ice-candidate", incoming));
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

app.post("/sendMessage", (req, res) => {
  let data = req.body;
  Chats.create().then((chatData) => {
    const id_chat = chatData.dataValues.id;
    ChatJoin.create({ id_user: data.id_user, id_chat: id_chat }).then(() => {
      ChatJoin.create({ id_user: data.postUserId, id_chat: id_chat }).then(() => {
        Messages.create({
          message: data.message,
          id_user: data.id_user,
          id_chat: Number(id_chat),
        })
          .then((data) => {
            console.info("sucessful message", data);
            res.send("sucessful posted message");
          })
          .catch((err) => {
            console.info(err);
          });
      });
    });
  });
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

// app.post("/sendMessage", (req, res) => {
//   let data = req.body;
//   startChat(data)
//     .then(() => res.send("Chat created."))
//     .catch((err) => res.status(500).send(err));
// });

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
      tags.map((tag) => {
        addTags(postId, tag);
      });
      res.status(201).json({ redirectUrl: "/home" });
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/viewProfile/:id", (req, res) => {
  console.info(req.params.id);
  const user = req.params.id;
  getUsername(user)
    .then((data) => {
      console.info(data.dataValues);
      const { propic, city, description, cell, email } = data.dataValues;
      const userInfo = { city, description, cell, email, propic };
      res.send(userInfo);
    })
    .catch((err) => {
      console.info(err);
      res.send(err);
    });
});

app.get("*", (req, res) => {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

server.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
