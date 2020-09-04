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
  userName: Sequelize.STRING,
  city: Sequelize.STRING,
  desciption: Sequelize.STRING,
  googleId: Sequelize.STRING,
  gmail: Sequelize.STRING,
  cell: Sequelize.TEXT,
});

const Messages = sequelize.define("Messages", {
  message: Sequelize.STRING,
  id_user: Sequelize.INTEGER,
  id_chat: {
    type: Sequelize.INTEGER,
    references: {
      model: "Chats",
      key: "id",
    },
  },
});

const Chats = sequelize.define("Chats", {
  name: Sequelize.STRING,
});

const ChatJoin = sequelize.define("ChatJoin", {
  id_user: Sequelize.INTEGER,
  id_chat: {
    type: Sequelize.INTEGER,
    references: {
      model: "Chats",
      key: "id",
    },
  },
});

const Posts = sequelize.define("Posts", {
  id_user: Sequelize.INTEGER,
  message: Sequelize.STRING,
});

const Tags = sequelize.define("Tags", {
  id_post: {
    type: Sequelize.INTEGER,
    references: {
      model: "Posts",
      key: "id",
    },
  },
  tag: Sequelize.STRING,
});

Users.sync({ force: true }).then(() => {
  Posts.sync({ force: true });
  Chats.sync({ force: true }).then(() => {
    ChatJoin.sync({ force: true });
    Messages.sync({ force: true });
    Tags.sync({ force: true });
  });
});

module.exports = {
  sequelize,
  Users,
  Posts,
  Chats,
  ChatJoin,
  Messages,
  Tags,
};
