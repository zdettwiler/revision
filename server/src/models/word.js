import mongoose from 'mongoose'
import validator from 'validator'
import { revisionBoxes } from '../constants'

/*
 * Only for greek for now; in the future, it will need to be adaptable to any
 * collection of words added.
 */


const wordSchema = new mongoose.Schema({
  greek: {
    type: String,
    required: true,
    unique: true,
    validate: value => typeof value === 'string'
  },
  french: {
    type: String,
    validate: value => typeof value === 'string'
  },
  english: {
    type: String,
    validate: value => typeof value === 'string'
  },
  chapter: {
    type: Number,
    required: true,
    // validate: value => validator.isInt(value)
  },
  revisionBox: {
    type: String,
    required: true,
    default: revisionBoxes[0],
    validate: value => validator.isIn(value, revisionBoxes)
  },
  lastRevised: {
    type: Date,
    // validate: value => validator.isBefore(value, new Date)
  }
})


module.exports = mongoose.model('nt-greek-duff', wordSchema)
