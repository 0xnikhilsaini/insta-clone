const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Like = sequelize.define('like', {
  userId: DataTypes.INTEGER,
  postId: DataTypes.INTEGER,
});

module.exports = Like;
