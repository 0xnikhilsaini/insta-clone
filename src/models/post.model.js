const { Sequelize, DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelize = require('../utils/database');

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
});

sequelizePaginate.paginate(Post);
module.exports = Post;
