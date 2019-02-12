import db from './db'
import Word from './models/word'
import { revisionBoxes } from './constants'


export default async function correctExercise(exercise) {
  let correctionTime = new Date()

  for (let word of exercise) {
    let wordRecord = await Word.findOne({ greek: word.question }).exec()

    let thing = await Word.findByIdAndUpdate(
      wordRecord._id,
      {
        $set: {
          revisionBox: revisionBoxes[revisionBoxes.indexOf(wordRecord.revisionBox)+1],
          lastRevised: correctionTime.toISOString()
        }
      },
      {
        new: true, // don't return updated doc
        runValidators: true // validate before update
      }
    ).exec()
  }

  // go through each word of the exercise

  // - if correct answer, update to next revisionBoxes
  // else if wrong answer, update to revisionBoxes[0]
  // - update lastRevised to current date


  // WordModel.findOneAndUpdate(
  //   {
  //     greek: // search for the word by <greek>  // search query
  //   },
  //   {
  //     revisionBoxes: // <new revisionBox>
  //     lastRevised: // <correctionTime>
  //   },
  //   {
  //     new: true, // return updated doc
  //     runValidators: true // validate before update
  //   }
  // ).then(doc => {
  //   console.log(doc)
  //
  // }).catch(err => {
  //   console.error(err)
  // })
}
