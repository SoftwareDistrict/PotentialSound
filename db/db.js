require('dotenv').config();
const { Sequelize } = require('sequelize');

const {DB_NAME, DB_USER, DB_HOST} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, '', {
  host: DB_HOST,
  dialect: 'postgres'
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.info('Connection has been established successfully.');
  } catch (error) {
    console.warn('Unable to connect to the database:', error);
  }
}
connect();
// creating the tables
//1//
const Users = sequelize.define('Users', {
  userName: Sequelize.STRING,
  city: Sequelize.STRING,
  desciption: Sequelize.STRING,
  googleId: Sequelize.STRING,
  gmail: Sequelize.STRING,
  cell: Sequelize.TEXT,
});
//2
const Messages = sequelize.define('Messages', {
  message: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
  }
},
  chatId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Chats',
      key: 'id'
    }
  },
  
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})
//3//
const Chats = sequelize.define('Chats', {
  name: Sequelize.STRING,
})
//4
const ChatJoin = sequelize.define('ChatJoin', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }   
  },
  chatId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Chats',
      key: 'id'
    }
  }
})
//5//
const Posts = sequelize.define('Posts', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  message: Sequelize.STRING,
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
   }
  
})
//6//
const Tags = sequelize.define('Tags', {
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Posts',
      key: 'id'
    }
  },
  tag: Sequelize.STRING
})


// .then(() => sequelize.query('createdb potentialsound -O root'))
// sequelize
// .query('DROP DATABASE IF EXISTS potentialsound')
// .then(() => sequelize.query('CREATE DATABASE pontentialsound'))
// .then(() => sequelize.query('GRANT ALL PRIVILEGES ON DATABASE potentialsound to root'))
// .then(() => sequelize.query('\c potentialsound'))
// .then(() => {
//   })

Users.sync({ force: true})
.then(() => {
  Posts.sync({ force: true});
  Chats.sync({ force: true})
  .then(() => {
    ChatJoin.sync({ force: true});
    Messages.sync({ force: true});
    Tags.sync({ force: true});
  })
})


module.exports = {
  sequelize
}