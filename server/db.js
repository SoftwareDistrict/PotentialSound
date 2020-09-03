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
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  chatId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Chats",
      key: "id",
    },
  },
  created_at: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updated_at: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

const Chats = sequelize.define("Chats", {
  name: Sequelize.STRING,
});

const ChatJoin = sequelize.define("ChatJoin", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  chatId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Chats",
      key: "id",
    },
  },
});

const Posts = sequelize.define("Posts", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  message: Sequelize.STRING,
  created_at: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updated_at: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

const Tags = sequelize.define("Tags", {
  postId: {
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
