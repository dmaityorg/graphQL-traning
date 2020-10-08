const { GraphQLServer } = require('graphql-yoga');
const path = require('path');

const userResolvers = require('./resolvers/users');

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'typeDefs', 'user.graphql'),
    resolvers: userResolvers
});

server.start();

