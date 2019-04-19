const MongoClient = require('mongodb').MongoClient;

class Mongo {
  constructor() {
    // Database Name
    this.dbName = 'myproject';
    // Create a new MongoClient
    this.client = null
  }

  async connect(url) {
    // Use connect method to connect to the Server
    try {
      this.client = await MongoClient.connect(url);
      console.log("Connected successfully to server");

      this.db = this.client.db(this.dbName);
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