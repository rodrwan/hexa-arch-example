class User {
  constructor(firstName, lastName, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = new Address(
      address.addressLine,
      address.addressNumber,
      address.locality,
    );
  }
}


class Address {
  constructor(addressLine, addressNumber, locality) {
    this.addressLine = addressLine;
    this.addressNumber = addressNumber;
    this.locality = locality;
  }
}

module.exports = {
  User,
  Address
}