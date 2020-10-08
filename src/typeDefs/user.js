const { gql } = require('apollo-server')
const typeDefs = gql`
    type User {
        id: ID
        first_name: String
        last_name: String
        email: String
        address: String
    }

    type Query {
        users: [User]
        user(id: ID): User
        hello: String
    }

    type Mutation {
        createUser(first_name: String, last_name: String, email: String, address: String): User
        updateUser(first_name: String, last_name: String, email: String, address: String, id: ID): User
        deleteUser(id: ID): User
    }
`
module.exports = typeDefs