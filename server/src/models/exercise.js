import mongoose from 'mongoose'
import validator from 'validator'
import { revisionBoxes } from './constants'

/*
 * Only for greek for now; in the future, it will need to be adaptable to any
 * collection of words added.
 */


const exerciseSchema = new mongoose.Schema({
  exercise: {
    // json
  },
  date: {
    type: Date,
    required: true,
    default: new Date,
    // validate: value => validator.isBefore(value, new Date)
  }
})


module.exports = mongoose.model('exercise', exerciseSchema)
