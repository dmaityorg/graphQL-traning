const models = require("../models");

module.exports = {
  Query: {
    getUser: async (_, { id }, { models }) => {
      const user = await models.user.findByPk(id);
      return user;
    },
    getAllUsers: async (_, args, { models }) => {
      const users = await models.user.findAll();
      return users
    }
  },

  Mutation: {
    createUser: async (_, { first_name, last_name, email, address }, { models }) => {
      const user = await models.user.findOne({ where: { email } });
      if (!user){
        return await models.user.create({ first_name, last_name, email, address });
      }
    },

    updateUser: async(_, { id, first_name, last_name, email, address }, { models }) => {
      return models.user.update({ first_name, last_name, email, address }, {where: {id}})
    },

    deleteUser: async (_, { id }, { models }) => {
      return models.user.destroy({where: {id}});
    }
  },
}