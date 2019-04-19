class Users {
  constructor(db) {
    this.db = db
  }

  async create(user) {
    try {
      await this.db.create('users', user)
    } catch (err) {
      throw err
    }
  }
}

module.exports = Users