const sequelize = require('../utils/database');
const logger = require('../config/logger');
const User = require('./user.model');
const Token = require('./token.model');
const Post = require('./post.model');
const Image = require('./image.model');
const Like = require('./like.model');

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database: ', error);
  });

sequelize
  .sync({ force: true })
  .then(() => {
    logger.info('table created successfully!');
  })
  .catch((error) => {
    logger.error('Unable to create table : ', error);
  });

// Define associations between models
User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Image);
Image.belongsTo(Post);

Like.belongsTo(User);
Like.belongsTo(Post);

module.exports = { User, Token, Post, Image, Like };
