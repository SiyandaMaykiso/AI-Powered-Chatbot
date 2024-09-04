// models/ChatLog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatLog = sequelize.define('ChatLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically generate unique IDs
  },
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
  previousMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true,  // This will store the ID of the previous message (for conversation context)
  }
}, {
  timestamps: true, // Ensure createdAt and updatedAt fields are added
});

module.exports = ChatLog;
