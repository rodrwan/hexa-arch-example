const express = require('express');
const bodyParser = require('body-parser');

const Mongo = require('../../services/mongo/mongo');
const { User, Address } = require('../../services/mongo/user');

const port = process.env.PORT || 3000;
const app = express();

const db = new Mongo()
db.connect('mongodb://localhost:27017/myproject');

app.use(bodyParser.json());

app.post('/users', async (req, res, next) => {
  const { user } = req.body
  const { address } = user

  const addr = new Address({
    addressLine: address.addressLine,
    addressNumber: address.addressNumber,
    locality: address.locality,
  });

  const u = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    address: addr,
  });

  try {
    res.status(201).json(await u.save());
  } catch (err) {
    next(err);
  }
});

app.get('/users', async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.get('/users/:id', async (req, res, next) => {
  const { id } = res.params;
  try {
    const result = await User.findById(id);
    res.status(200).json({
      ...result._doc,
      id: result._doc._id
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ error: err.message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))