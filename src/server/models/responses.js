'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Requests)
      // this.belongsTo(models.Requests, {
      //   foreignKey: 'requestId',
      //   as: 'requestId'
      // })
    }
  }
  Responses.init({
    data: DataTypes.JSON,
    id: { 
      type: DataTypes.UUID,
      primaryKey: true
    },
    requestId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Responses',
  });
  return Responses;
};