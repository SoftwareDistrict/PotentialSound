const { Op } = require("sequelize");
const { Users, Posts, Tags } = require("./db");

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
const getUsers = () => Users.findAll();
const getTags = () => Tags.findAll();

const addUser = (userId, userInfoObj) => Users.update(userInfoObj, { where: { id: userId } });
const addPost = (post) => Posts.create(post);
const addTags = (postId, tag) => Tags.create({ id_post: postId, tag: tag });

module.exports = {
  getPosts,
  getTags,
  getUsers,
  getCurrentUser,
  isAccCreated,
  addUser,
  addPost,
  addTags,
};
