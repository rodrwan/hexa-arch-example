const mongoose = require('mongoose');


const Schema = mongoose.Schema

const addressSchema = new Schema({
  addressLine: {
    type: String,
    required: true,
  },
  addressNumber: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Address: mongoose.model('Address', addressSchema),
}