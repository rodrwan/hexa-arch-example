const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Address {
  addressLine: String!
  addressNumber: Int!
  locality: String!
}

type User {
  id: String!
  firstName: String!
  lastName: String!
  address: Address!
}

type RootQuery {
  getUser(id: String): User
  getUsers: [User!]!
}

input InputAddress {
  addressLine: String!
  addressNumber: Int!
  locality: String!
}

input InputUser {
  firstName: String!
  lastName: String!
  address: InputAddress!
}

type RootMutation {
  crateUser(data: InputUser): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
