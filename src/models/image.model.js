const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Image = sequelize.define(
  'images',
  {
    imageUrl: DataTypes.STRING,
  },
  { timeStamp: false }
);

module.exports = Image;
