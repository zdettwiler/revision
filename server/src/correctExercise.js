import mongoose from 'mongoose'
import db from './db'
import UserWord from './models/userword'
import { revisionBoxes } from './constants'


export default async function correctExercise(userId, exercise) {
  let correctionTime = new Date()

  // go through each word of the exercise
  for (let word of exercise) {
    try {
      let wordRecord = await UserWord.findOne({
        user: userId,
        word: word._id
      }).exec()

      // if correct answer, update to next revisionBoxes
      // if wrong answer, update to revisionBoxes[0]
      let newRevisionBox = word.result
        ? revisionBoxes[revisionBoxes.indexOf(wordRecord.revisionBox)+1]
        : revisionBoxes[0]

      await UserWord.findOneAndUpdate(
        {
          user: userId,
          word: word._id
        },
        {
          $set: {
            revisionBox: newRevisionBox,
            lastRevised: correctionTime.toISOString()
          }
        },
        {
          new: false, // don't return updated doc
          runValidators: true // validate before update
        }
      ).exec()


    } catch (err) { console.log(err)
      return { error: err } }
  }

  // if all's worked fine
  return true
}
