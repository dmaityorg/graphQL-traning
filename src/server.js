const connect = require('connect');
const { ApolloServer } = require('apollo-server-express');
const query = require('qs-middleware');
const express = require("express")
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers/resolvers');
const models = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})
 
const app = connect();
const path = '/graphql';
 
app.use(query());
server.applyMiddleware({ app, path });
 
app.listen({ port: 4000 }, () =>
  console.log(`GraphQL Server is ready at http://localhost:4000${server.graphqlPath}`)
);