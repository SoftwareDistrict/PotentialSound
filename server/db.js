require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USER, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, " ", {
  host: DB_HOST,
  dialect: "postgres",
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.info("Connection has been established successfully.");
  } catch (error) {
    console.warn("Unable to connect to the database:", error);
  }
};
connect();

const Users = sequelize.define("Users", {
  username: Sequelize.STRING,
  propic: Sequelize.TEXT,
  city: Sequelize.STRING,
  description: Sequelize.TEXT,
  googleId: Sequelize.STRING,
  email: Sequelize.STRING,
  cell: Sequelize.TEXT,
});

const Messages = sequelize.define("Messages", {
  url_image: Sequelize.TEXT,
  url_audio: Sequelize.TEXT,
  name_audio: Sequelize.TEXT,
  message: Sequelize.TEXT,
  id_user: Sequelize.INTEGER,
  id_chat: Sequelize.INTEGER,
});

const Chats = sequelize.define("Chats", {
  name: Sequelize.STRING,
});

const ChatJoin = sequelize.define("ChatJoin", {
  id_user: Sequelize.INTEGER,
  id_chat: Sequelize.INTEGER,
});

const Posts = sequelize.define("Posts", {
  id_user: Sequelize.INTEGER,
  message: Sequelize.TEXT,
  audioName: Sequelize.TEXT,
  audioUrl: Sequelize.TEXT,
  imageName: Sequelize.TEXT,
  imageUrl: Sequelize.TEXT,
});

const Tags = sequelize.define("Tags", {
  id_post: Sequelize.INTEGER,
  tag: Sequelize.STRING,
});

Users.sync({ force: true })
  .then(() => {
    Users.bulkCreate([
      {
        username: "EddySkeleton",
        propic: "https://tinyurl.com/y2o8d4uv",
        city: "Los Angeles",
        description:
          "Hard Rock group. Shows at The Rabid Rabbit every other Tuesday. Check us out!",
        googleId: "12345567788892736",
        email: "bunnybandits69@gmail.com",
        cell: "1111111111",
      },
      {
        username: "BlazeOps",
        propic: "https://tinyurl.com/y6xblg3n",
        city: "Atlanta",
        description: "Producer. Rap beats. Looking to collab with some young talent.",
        googleId: "4352627181993038262",
        email: "blazeops223@gmail.com",
        cell: "2222222222",
      },
      {
        username: "SmallyBigz",
        propic: "https://tinyurl.com/y5j9q9sg",
        city: "New York",
        description: "Rapper. Got bars forever. Looking for some sound to accompany them.",
        googleId: "7777388373848493",
        email: "smallworld@gmail.com",
        cell: "3333333333",
      },
      {
        username: "Jay",
        propic: "https://tinyurl.com/y2ucpnz2",
        city: "Tampa Bay",
        description: "Drummer. I do anything from hard rock to R&B. You need drums, I'm your man",
        googleId: "4352627181993038262",
        email: "jaybirdbeats@gmail.com",
        cell: "4444444444",
      },
      {
        username: "BlahtahBaby",
        propic: "https://tinyurl.com/yxg46gcq",
        city: "Chicago",
        description: "Female R&B vocalist.",
        googleId: "25263738382929110",
        email: "blahtahbb@gmail.com",
        cell: "5555555555",
      },
    ]);
    Posts.sync({ force: true })
      .then(() => {
        Posts.bulkCreate([
          {
            id_user: 1,
            message:
              "Hey, looking for a new drummer with some experience for our rock band The Bottom Feeders. If you are interested hit us up.",
          },
          {
            id_user: 2,
            message: "Got some dope beats and looking for someone to jump on. HMU.",
          },
          {
            id_user: 4,
            message:
              "Looking to get rid of this guitar and amp. Just put new strings on it but I just don't paly it anymore. $250 for the set OBO.",
            imageName: "guitar.jpg",
            imageUrl:
              "https://s3-us-east-2.amazonaws.com/potentialsound/5f967613-e7f6-41fb-9ae2-33c8e81ea394.png",
          },
        ]);
      })
      .catch((err) => console.warn("Postsssssssss", err));
    Chats.sync({ force: true })
      .then(() => {
        Chats.bulkCreate([
          {
            name: "Bottom Feeders",
          },
          {
            name: "Mad Minds",
          },
          {
            name: "Group A",
          },
        ]);
      })
      .catch((err) => console.warn("Chatsssssss", err));
  })
  .then(() => {
    ChatJoin.sync({ force: true })
      .then(() => {
        ChatJoin.bulkCreate([
          {
            id_user: 1,
            id_chat: 1,
          },
          {
            id_user: 2,
            id_chat: 1,
          },
          {
            id_user: 6,
            id_chat: 1,
          },
          {
            id_user: 2,
            id_chat: 2,
          },
          {
            id_user: 3,
            id_chat: 2,
          },
          {
            id_user: 5,
            id_chat: 2,
          },
          {
            id_user: 6,
            id_chat: 2,
          },
          {
            id_user: 2,
            id_chat: 3,
          },
          {
            id_user: 3,
            id_chat: 3,
          },
          {
            id_user: 4,
            id_chat: 3,
          },
          {
            id_user: 5,
            id_chat: 3,
          },
        ]);
      })
      .catch((err) => console.warn("ChatJoinnnnnnnn", err));
    Messages.sync({ force: true })
      .then(() => {
        Messages.bulkCreate([
          {
            id_user: 1,
            id_chat: 1,
            message: "Hey man!",
          },
          {
            id_user: 2,
            id_chat: 1,
            message: "What's good?",
          },
          {
            id_user: 2,
            id_chat: 1,
            message: "I mess with your last album.",
          },
          {
            id_user: 1,
            id_chat: 1,
            message:
              "We appreciate that dude. We need a drummer, but we are outsourcing to expand our sound.",
          },
          {
            id_user: 1,
            id_chat: 1,
            message: "Interested?",
          },
          {
            id_user: 2,
            id_chat: 1,
            message: "That's tight, yeah I'd like to do something with you guys.",
          },
          {
            id_user: 3,
            id_chat: 2,
            message: "Alright, let's get started.",
          },
          {
            id_user: 3,
            id_chat: 2,
            message: "I brought you guys here becasue I think we could do something big",
          },
          {
            id_user: 2,
            id_chat: 2,
            message: "Yeah alright, we're all dope!",
          },
          {
            id_user: 2,
            id_chat: 2,
            message: "I got some sound in the works you'd be great on.",
          },
          {
            id_user: 5,
            id_chat: 2,
            message: "Okay cool! I've been wanting to work with you guys.",
          },
          {
            id_user: 2,
            id_chat: 2,
            message: "I feel the same way.",
          },
          {
            id_user: 3,
            id_chat: 2,
            message: "This is gonna be crazy!",
          },
          {
            id_user: 2,
            id_chat: 3,
            message:
              "I added Jay to the group, because I'm trying to get some realistic symbol sounds with a human touch.",
          },
          {
            id_user: 3,
            id_chat: 3,
            message: "Yeah, I mess with that.",
          },
          {
            id_user: 5,
            id_chat: 3,
            message: "I trust you Op, if you think it'll work, I'm down.",
          },
          {
            id_user: 3,
            id_chat: 3,
            message: "What's up Jay?",
          },
          {
            id_user: 4,
            id_chat: 3,
            message: "Hey guys, thanks for adding me on this project.",
          },
          {
            id_user: 3,
            id_chat: 3,
            message: "No worries bro. Glad to have you.",
          },
          {
            id_user: 4,
            id_chat: 3,
            message: "Cool!",
          },
          {
            id_user: 2,
            id_chat: 3,
            message: "Alright so here's something Jay and I did.",
          },
          {
            id_user: 5,
            id_chat: 3,
            message: "Wow! Jay killing it!",
          },
          {
            id_user: 2,
            id_chat: 3,
            message: "That sounds awesome!",
          },
        ]);
      })
      .catch((err) => console.warn("Messagesssssss", err));
    Tags.sync({ force: true })
      .then(() => {
        Tags.bulkCreate([
          {
            id_post: 1,
            tag: "#rock",
          },
          {
            id_post: 1,
            tag: "#help-wanted",
          },
          {
            id_post: 1,
            tag: "#band",
          },
          {
            id_post: 2,
            tag: "#collab",
          },
          {
            id_post: 2,
            tag: "#beats",
          },
          {
            id_post: 2,
            tag: "#rapper",
          },
          {
            id_post: 3,
            tag: "#sale",
          },
          {
            id_post: 3,
            tag: "#instrument",
          },
          {
            id_post: 3,
            tag: "#rock",
          },
        ]);
      })
      .catch((err) => console.warn("Tagssssssss", err));
  })
  .catch((err) => console.warn("ahhhhhhh", err));

module.exports = {
  sequelize,
  Users,
  Posts,
  Chats,
  ChatJoin,
  Messages,
  Tags,
};
