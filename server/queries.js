const { Op } = require("sequelize");
const { Users, Posts, Tags, Chats, ChatJoin, Messages } = require("./db");

const isAccCreated = (googleId) =>
  Users.findAll({
    where: {
      [Op.and]: [{ googleId }, { username: { [Op.not]: null } }],
    },
  })
    .then((list) => !!list.length)
    .catch((err) => err);

const getCurrentUser = (userId) => Users.findOne({ where: { id: userId } });

const getPosts = () => Posts.findAll();
const getThisPost = (id) => Posts.findOne({ where: { id: id } });
const getUsers = () => Users.findAll();
const getTags = () => Tags.findAll();
const getChats = () => ChatJoin.findAll();
const getPoster = (id) => Users.findOne({ where: { id: id } });
const getMessagesForChat = (id_chat) => Messages.findAll({ where: { id_chat: id_chat } });
const addMessage = (message) => Messages.create(message);
const getUsername = (username) => Users.findOne({ where: { username: username } });
const addUser = (userId, userInfoObj) => Users.update(userInfoObj, { where: { id: userId } });
const addPost = (post) => Posts.create(post);
const addTags = (postId, tag) => Tags.create({ id_post: postId, tag: tag });

const startChat = (data) => {
  Chats.create()
    .then((chatData) => {
      const id_chat = chatData.dataValues.id;
      ChatJoin.create({ id_user: data.id_user, id_chat: id_chat })
        .then(() => {
          ChatJoin.create({ id_user: data.postUserId, id_chat: id_chat })
            .then(() => {
              Messages.create({
                message: data.message,
                id_user: data.id_user,
                id_chat: Number(id_chat),
              })
                .then((data) => {
                  console.info("sucessful posted message", data);
                })
                .catch((err) => console.warn("could not post message", err));
            })
            .catch((err) => console.warn("something went wrong after create poster row.", err));
        })
        .catch((err) => console.warn("something went wrong after create other row.", err));
    })
    .catch((err) => console.warn("something went wrong after creating chat.", err));
};

module.exports = {
  getPosts,
  getUsername,
  getThisPost,
  getTags,
  getUsers,
  getCurrentUser,
  getChats,
  getPoster,
  isAccCreated,
  addUser,
  addPost,
  addTags,
  startChat,
  addMessage,
  getMessagesForChat,
};
