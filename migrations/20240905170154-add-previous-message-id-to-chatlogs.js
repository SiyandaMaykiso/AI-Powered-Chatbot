'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ChatLogs', 'previousMessageId', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Can be null for the first message in a conversation
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ChatLogs', 'previousMessageId');
  }
};
