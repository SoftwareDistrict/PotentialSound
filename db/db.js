const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('potentialsound', 'root', ' ', {
  host: 'localhost',
  dialect: 'postgres'
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();


// .then(() => sequelize.query('createdb potentialsound -O root'))
// sequelize
// .query('DROP DATABASE IF EXISTS potentialsound')
// .then(() => sequelize.query('CREATE DATABASE pontentialsound'))
// .then(() => sequelize.query('GRANT ALL PRIVILEGES ON DATABASE potentialsound to root'))
// .then(() => sequelize.query('\c potentialsound'))
// .then(() => {
  const User = sequelize.define('User', {
    userName: Sequelize.STRING,
    city: Sequelize.STRING,
    desciption: Sequelize.STRING,
    googleId: Sequelize.STRING,
    gmail: Sequelize.STRING,
    cell: Sequelize.TEXT,
  });
//   })

User.sync()



module.exports = {
  sequelize
}