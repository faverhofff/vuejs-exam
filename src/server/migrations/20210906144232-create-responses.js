'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Responses', {            
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON
      },
      requestId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Responses');
  }
};