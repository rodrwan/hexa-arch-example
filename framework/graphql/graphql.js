const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const Mongo = require('../../services/mongo/mongo');
const { User, Address } = require('../../services/mongo/user');

const port = process.env.PORT || 3000;
const app = express();

const db = new Mongo()
db.connect('mongodb://localhost:27017/myproject');

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
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
  `),
  rootValue: {
    getUser: async (args) => {
      const { id } = args;
      try {
        const result = await User.findById(id);
        return {
          ...result._doc,
          id: result._doc._id
        }
      } catch (err) {
        throw err;
      }
    },
    getUsers: async () => {
      try {
        return User.find();
      } catch (err) {
        throw err;
      }
    },
    crateUser: async (args) => {
      const { data } = args
      const { address } = data

      const addr = new Address({
        addressLine: address.addressLine,
        addressNumber: address.addressNumber,
        locality: address.locality
      });

      const u = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        address: addr
      });

      try {
        return u.save();
      } catch (err) {
        throw err;
      }
    },
  },
  graphiql: true,
}));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))