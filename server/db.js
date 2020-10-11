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
  youTube: Sequelize.STRING,
  facebook: Sequelize.STRING,
  instagram: Sequelize.STRING,
  soundCloud: Sequelize.STRING,
  instaHandle: Sequelize.STRING,
});

const Messages = sequelize.define("Messages", {
  url_image: Sequelize.TEXT,
  url_audio: Sequelize.TEXT,
  name_audio: Sequelize.TEXT,
  message: Sequelize.TEXT,
  id_user: Sequelize.INTEGER,
  id_chat: Sequelize.INTEGER,
  meeting: Sequelize.TEXT,
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
  youTubeUrl: Sequelize.TEXT,
});

const Tags = sequelize.define("Tags", {
  id_post: Sequelize.INTEGER,
  tag: Sequelize.STRING,
});

Users.sync()
  .then(() => {
    Posts.sync();
    Chats.sync().then(() => {
      ChatJoin.sync();
      Messages.sync();
      Tags.sync();
    });
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
