const models = require("../models");

module.exports = {
  Query: {
    getAllPosts: async (_, args, { models }) => { 
      return await models.post.findAll();
    },

    getPost: async(_, { id }, { models }) => {
      return await models.post.findByPk(id);
    },
  },
  Mutation: {
    createPost: async (_, { title, description, publish_date, user_id }, { models }) => {
      return await models.post.create({ title, description, publish_date, user_id });
    },
  }
}