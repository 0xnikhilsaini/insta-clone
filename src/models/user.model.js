/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../utils/database');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  }
);

User.prototype.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.isEmailTaken = async function (email) {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return !!user;
};

module.exports = User;
