'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ChatLogs', 'previousMessageId', {
      type: Sequelize.INTEGER,
      allowNull: true,  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ChatLogs', 'previousMessageId');
  }
};
