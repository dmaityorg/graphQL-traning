const models = require("../models");

module.exports = {
  Query: {
    getAllComments: async (_, args, { models }) => { 
        return await models.comments.findAll();
      },
  },
  Mutation: {
    addComment: async (_, { description, post_id }, { models }) => {
      return await models.comments.create({ description, post_id });
    },
  }
}