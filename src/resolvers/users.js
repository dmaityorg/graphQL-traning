const User = require("../models").user;

module.exports = {
  Query: {
    users: () => { return User.findAll() },
    user: (_, { id }) => { return User.findOne({ where: { id } }) },
    hello: () => { return "Hello World" },
  },
  Mutation: {
    createUser: (_, { first_name, last_name, email, address }) => { return User.create({ first_name, last_name, email, address }) },
    updateUser: (_, { id, first_name, last_name, email, address}) => { return User.update({ first_name, last_name, email, address }, {where: {id}})},
    deleteUser: (_, { id }) => { return User.destroy({where: {id}})}
  }
}