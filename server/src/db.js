import mongoose from 'mongoose'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

let credentials
let server
let database

if (process.env.NODE_ENV === 'test') {
  credentials = `${process.env.MONGODB_TEST_USER}:${process.env.MONGODB_TEST_PSW}`
  server = process.env.MONGODB_TEST_SERVER
  database = process.env.MONGODB_TEST_DATABASE

} else {
  credentials = `${process.env.MONGODB_USER}:${process.env.MONGODB_PSW}`
  server = process.env.MONGODB_SERVER
  database = process.env.MONGODB_DATABASE

}

class DB {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(
      `mongodb://${credentials}@${server}/${database}`,
      { useNewUrlParser: true })
    .then(() => {
      let test = process.env.NODE_ENV === 'test' ? 'test ' : ''
      console.log(`Database ${test}connection successful`)
    })
    .catch(err => {
      console.error('Database connection error', err)
    })
  }

  disconnect() {
    console.log('Disconnecting from database')
    mongoose.disconnect()
  }

  dropCollection(collection, callback) {
    console.log('Dropping ', collection)
    if (collection in mongoose.connection.collections) {
      mongoose.connection.dropCollection(collection, err => {
        callback(err)
      })
    } else {
      throw 'Error: Collection does not exist!'
    }
  }
}

export default new DB()
