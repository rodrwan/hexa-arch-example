const mongoose = require('mongoose')

class Mongo {
  constructor() {
    // Database Name
    // Create a new MongoClient
    this.client = null
  }

  async connect(url) {
    // Use connect method to connect to the Server
    try {
      console.log("Connected successfully to server");
      return mongoose.connect(url);
    } catch (err) {
      throw err;
    }
  }

  close() {
    this.client.close();
  }

  async create(table, data) {
    try {
      // Get the documents collection
      const collection = this.db.collection(table);
      // Insert some documents
      return collection.insertOne(data);
    } catch (err) {
      throw err;
    }
  }
}


module.exports = Mongo;