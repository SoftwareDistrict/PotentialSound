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
const getPoster = (id) => Users.findOne({ where: { id: id } });
const getPostTags = (id) => Tags.findAll({ where: { id_post: id } });

const addUser = (userId, userInfoObj) => Users.update(userInfoObj, { where: { id: userId } });


module.exports = {
  getPosts,
  getPoster,
  getPostTags,
  getCurrentUser,
  isAccCreated,
  addUser,
};
