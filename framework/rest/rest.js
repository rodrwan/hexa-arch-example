const express = require('express');
const bodyParser = require('body-parser');

const Mongo = require('../services/mongo');
const { User, Address } = require('../domain/user');
const Users = require('../application/users')

const port = 3000;
const app = express();

const db = new Mongo();
db.connect('mongodb://localhost:27017');

app.use(bodyParser.json());

app.post('/users', async (req, res, next) => {
  const { user } = req.body
  const { address } = user

  const addr = new Address(address.addressLine, address.addressNumber, address.locality);

  const u = new User(user.firstName, user.lastName, addr);

  const usersApp = new Users(db)

  try {
    await usersApp.create(u);
    res.status(201).json(u);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ error: err.message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))