const { Op } = require("sequelize");
const { Users, Posts, Tags, ChatJoin, Messages } = require("./db");

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
const getUsername = (username) => Users.findOne({where: {username: username}});
const getUsers = () => Users.findAll();
const getTags = () => Tags.findAll();
const getMessages = () => Messages.findAll();
const getChats = () => ChatJoin.findAll();
const getPoster = (id) => Users.findOne({ where: { id: id } });

const addUser = (userId, userInfoObj) => Users.update(userInfoObj, { where: { id: userId } });
const addPost = (post) => Posts.create(post);
const addTags = (postId, tag) => Tags.create({ id_post: postId, tag: tag });

module.exports = {
  getUsername,
  getPosts,
  getThisPost,
  getTags,
  getUsers,
  getCurrentUser,
  getMessages,
  getChats,
  getPoster,
  isAccCreated,
  addUser,
  addPost,
  addTags,
};
