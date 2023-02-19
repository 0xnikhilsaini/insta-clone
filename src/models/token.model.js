const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const { tokenTypes } = require('../config/tokens');

const Token = sequelize.define('token', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL),
    allowNull: false,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
    default: false,
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

module.exports = Token;
