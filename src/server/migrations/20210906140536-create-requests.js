'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requests', {      
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      url: {
        type: Sequelize.STRING
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Requests');
  }
};