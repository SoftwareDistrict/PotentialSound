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
// creating the tables
const User = sequelize.define('User', {
  userName: Sequelize.STRING,
  city: Sequelize.STRING,
  desciption: Sequelize.STRING,
  googleId: Sequelize.STRING,
  gmail: Sequelize.STRING,
  cell: Sequelize.TEXT,
});

// const Messages = sequelize.define('Messages', {
//   message: Sequelize.STRING,
//   userId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'Users',
//       referencesKey: 'id'
//   }
// },
//   chatId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'Chats',
//       referencesKey: 'id'
//     }
//   },
  
//   created_at: {
//     type: 'TIMESTAMP',
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: false
//   },
//   updated_at: {
//     type: 'TIMESTAMP',
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: false
//   }
// })

const Chats = sequelize.define('Chats', {
  name: Sequelize.STRING,
})

// const ChatJoin = sequelize.define('ChatJoin', {
//   userId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'Users',
//       referencesKey: 'id'
//     }
//   },
//   chatId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'Chats',
//       referencesKey: 'id'
//     }
//   }
// })

// const Posts = sequelize.define('Post', {
//   userId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'Users',
//       referencesKey: 'id'
//   },
//   message: Sequelize.STRING,
//   created_at: {
//     type: 'TIMESTAMP',
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: false
//   },
//   updated_at: {
//     type: 'TIMESTAMP',
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: false
//    }
//   }
// })

// const Tags = sequelize.define('Tags', {
//   postId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: 'Posts',
//       referencesKey: 'id'
//     }
//   },
//   tag: Sequelize.STRING
// })


// .then(() => sequelize.query('createdb potentialsound -O root'))
// sequelize
// .query('DROP DATABASE IF EXISTS potentialsound')
// .then(() => sequelize.query('CREATE DATABASE pontentialsound'))
// .then(() => sequelize.query('GRANT ALL PRIVILEGES ON DATABASE potentialsound to root'))
// .then(() => sequelize.query('\c potentialsound'))
// .then(() => {
//   })

User.sync({ force: true});
// Messages.sync({ force: true});
Chats.sync({ force: true});
// ChatJoin.sync({ force: true});
// Posts.sync({ force: true});
// Tags.sync({ force: true});


module.exports = {
  sequelize
}