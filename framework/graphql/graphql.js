const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const Mongo = require('../../services/mongo/mongo');

const db = new Mongo()
db.connect('mongodb://localhost:27017/myproject');

const schema = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))