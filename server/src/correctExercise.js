import db from './db'
import { revisionBoxes } from './constants'


export default async function correctExercise(userId, exercise, sheet) {
  let correctionTime = new Date()
  await sheet.connect()

  // go through each word of the exercise
  try {
    for (let word of exercise) {

      let wordRecord = sheet.findOne({ greek: word.question })

      // if correct answer, update to next revisionBoxes
      // if wrong answer, update to revisionBoxes[0]
      let newRevisionBox = word.result
        ? !wordRecord.revisionBox
          ? revisionBoxes[1]
          : revisionBoxes[revisionBoxes.indexOf(wordRecord.revisionBox)+1]
        : revisionBoxes[0]

      sheet.updateRow(
        { greek: word.question },
        {
          revisionBox: newRevisionBox,
          lastRevised: correctionTime
        }
      )
    }

    await sheet.save()

  } catch (err) {
    console.log(err)
    return err
  }

  // if all's worked fine
  return true
}
