import mongoose from 'mongoose'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const credentials = `${process.env.MONGODB_USER}:${process.env.MONGODB_PSW}`

class DB {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${credentials}@${process.env.MONGODB_SERVER}/${process.env.MONGODB_DATABASE}`,
      { useNewUrlParser: true })
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error', err)
    })
  }
}

module.exports = new DB()
