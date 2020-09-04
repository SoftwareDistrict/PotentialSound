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
  city: Sequelize.STRING,
  description: Sequelize.STRING,
  googleId: Sequelize.STRING,
  email: Sequelize.STRING,
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
  message: Sequelize.TEXT,
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

Users.sync({ force: true })
  .then(() => {
    Posts.sync({ force: true });
    Chats.sync({ force: true }).then(() => {
      ChatJoin.sync({ force: true });
      Messages.sync({ force: true });
      Tags.sync({ force: true });
    });
  })
  .then(() => {
    Users.bulkCreate([
      {
        username: "Eddy Skeleton",
        city: "Los Angeles",
        description:
          "Hard Rock group. Shows at The Rabid Rabbit every other Tuesday. Check us out!",
        googleId: "12345567788892736",
        email: "bunnybandits69@gmail.com",
        cell: "1231231231",
      },
      {
        username: "BlazeOps",
        city: "Atlanta",
        description: "Producer. Rap beats. Looking to collab with some young talent.",
        googleId: "4352627181993038262",
        email: "blazeops223@gmail.com",
        cell: "2222222222",
      },
    ]);
  })
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
    ]);
  })
  .then(() => {
    Tags.bulkCreate([
      {
        id_post: 1,
        tag: "#Rock",
      },
      {
        id_post: 1,
        tag: "#HelpWanted",
      },
      {
        id_post: 1,
        tag: "#Drummer",
      },
      {
        id_post: 2,
        tag: "#Collab",
      },
      {
        id_post: 2,
        tag: "#Beats",
      },
    ]);
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
