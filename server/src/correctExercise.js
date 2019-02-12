import db from './db'
import Word from './models/word'
import { revisionBoxes } from './constants'


export default async function correctExercise(exercise) {
  let correctionTime = new Date()

  // go through each word of the exercise
  for (let word of exercise) {
    try {

      let wordRecord = await Word.findOne({ greek: word.question }).exec()

      // if correct answer, update to next revisionBoxes
      // if wrong answer, update to revisionBoxes[0]
      let newRevisionBox = word.result
        ? revisionBoxes[revisionBoxes.indexOf(wordRecord.revisionBox)+1]
        : revisionBoxes[0]

      await Word.findByIdAndUpdate(
        wordRecord._id,
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
      
    } catch (err) { throw err }
  }
}
