const { Users, Posts, Tags } = require("./db");

const getPosts = () => Posts.findAll();
const getPoster = (id) => Users.findOne({ where: { id: id } });
const getPostTags = (id) => Tags.findAll({ where: { id_post: id } });

module.exports = {
  getPosts,
  getPoster,
  getPostTags,
};
