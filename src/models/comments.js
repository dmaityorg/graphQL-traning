'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.post)
    }
  };
  comment.init({
    description: DataTypes.STRING,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
    underscored: true
  });
  return comment;
};