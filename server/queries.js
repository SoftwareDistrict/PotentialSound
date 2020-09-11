const { Op } = require("sequelize");
const { Users, Posts, Tags, Chats, ChatJoin, Messages, LiveStreams } = require("./db");

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
const getChatIds = (id) => ChatJoin.findAll({ where: { id_user: id } });
const getPoster = (id) => Users.findOne({ where: { id: id } });
const getMessagesForChat = (id_chat) => Messages.findAll({ where: { id_chat: id_chat } });
const addMessage = (message) => Messages.create(message);
const search = (id) => Posts.findAll({ where: { id: id } });
const getUsername = (username) => Users.findOne({ where: { username: username } });

const addUser = (userId, userInfoObj) => Users.update(userInfoObj, { where: { id: userId } });
const addPost = (post) => Posts.create(post);

const addTags = (postId, tag) => Tags.create({ id_post: postId, tag: tag });
const createChat = () => Chats.create();
const createJoin = (obj) => ChatJoin.create(obj);
const sendMessage = (obj) => Messages.create(obj);

const addLiveStream = (obj) => LiveStreams.create(obj);
const deleteLiveStream = (id) => LiveStreams.destroy({ where: { id: id } });
const getLiveStreams = () => LiveStreams.findAll();

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
  addMessage,
  getMessagesForChat,
  search,
  getChatIds,
  createChat,
  createJoin,
  sendMessage,
  addLiveStream,
  deleteLiveStream,
  getLiveStreams,
};
