import db from './db'
import WordModel from './models/word'
import { revisionBoxes } from './constants'


// correctExercise()

// correction time = new Date
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
