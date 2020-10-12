'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      // defined association here
      post.belongsTo(models.user);
      post.hasMany(models.comments);
    }
  };
  post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
    underscored: true
  });
  return post;
};