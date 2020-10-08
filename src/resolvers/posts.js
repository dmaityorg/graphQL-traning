const Post = require("../models").post;

module.exports = {
  Query: {
    posts: () => { return Post.findAll() },
    post: (_, { id }) => { return Post.findOne({ where: { id } }) },
  },
  Mutation: {
    createPost: (_, { title, description, publish_date }) => { return Post.create({ title, description, publish_date }) },
  }
}