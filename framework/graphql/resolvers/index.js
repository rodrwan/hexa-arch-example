const { User, Address } = require('../../../services/mongo/user');

module.exports = {
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
}