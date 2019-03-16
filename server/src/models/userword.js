import mongoose from 'mongoose'
import validator from 'validator'
import { revisionBoxes } from '../constants'


const userWordSchema = new mongoose.Schema({
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nt-greek-duff',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  revisionBox: {
    type: String,
    required: true,
    default: revisionBoxes[0],
    validate: value => validator.isIn(value, revisionBoxes)
  },
  lastRevised: {
    type: Date
    // validate: value => validator.isBefore(value, new Date)
  },
  known: {
    type: Boolean,
    default: false
  }
}, { collection: 'user-words' })


export default mongoose.model('user-words', userWordSchema)
