'use strict';
const {
  Model
} = require('sequelize');
// const Responses = require('models').Responses;
module.exports = (sequelize, DataTypes) => {
  class Requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log(models);
      this.hasMany(models.Responses)
    }
  }
  Requests.init({
    url: DataTypes.STRING,
    id: { 
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Requests',
  });

  return Requests;
};