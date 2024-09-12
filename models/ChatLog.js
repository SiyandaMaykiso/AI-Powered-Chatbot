

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatLog = sequelize.define('ChatLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
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
    allowNull: true,  
  }
}, {
  timestamps: true, 
});

module.exports = ChatLog;
