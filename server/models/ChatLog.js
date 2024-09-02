// models/ChatLog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ChatLog = sequelize.define('ChatLog', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ChatLog;
