module.exports = {
  User: {
    async posts(post) {
      return post.getPosts();
    }
  },
  Post: {
    async user(user) {
      return user.getUser()
    },

    async comments(comment) {
      return comment.getComments();
    }
  },
  Comment: {
    async post(post) {
      return post.getPost();
    }
  },
};