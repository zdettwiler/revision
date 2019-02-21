import mongoose from 'mongoose'
import validator from 'validator'


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: value => validator.isEmail(value)
  },
  username: {
    type: String,
    validate: value => validator.isAlphanumeric(value)
  },
  password: {
    type: String,
    validate: value => typeof value === 'string'
  },
  token: {
    type: String,
    validate: value => typeof value === 'string'
  }
}, { collection: 'users' })


export default mongoose.model('users', userSchema)
