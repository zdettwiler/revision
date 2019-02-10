import Word from './models/word'
import { revisionBoxes } from './constants'

export default async function createDailyExercise(nbQuestions=5) {

  let exercise = []
  var wordsToTest = []
  let now = new Date()

// get all words in revisionBox[0] 'every-day' or no revisionBox or no lastRevised
// and add them all to questionPool
  try {
    let everyDay = await Word.find({
      revisionBox: revisionBoxes[0]
    })
    wordsToTest.push(...everyDay)

    // get all words in revisionBox[1] 'every-three-days'
    //  - if NOW - 3days < lastRevised add to questionPool
    // (= if lastRevised is more than 3days ago)

    let threeDaysAgo = new Date()
    threeDaysAgo.setDate(now.getDate() - 3)

    let everyThreeDays = await Word.find({
      revisionBox: revisionBoxes[1],
      lastRevised: { $lte: threeDaysAgo.toISOString() }
    })
    wordsToTest.push(...everyThreeDays)


// get all words in revisionBox[2] 'every-week'
//  - if NOW > lastRevised + 7days add to questionPool

// get all words in revisionBox[3] 'every-other-week'
//  - if NOW > lastRevised + 14days add to questionPool

// take a random selection of available words for exercise
// return exercise array
    let nextQuestionId
    while (wordsToTest.length > 0) {
      nextQuestionId = Math.round((wordsToTest.length-1) * Math.random())

      exercise.push({
        question: wordsToTest[nextQuestionId].greek,
        answer: wordsToTest[nextQuestionId].english,
        response: undefined,
        result: undefined
      })

      wordsToTest.splice(nextQuestionId, 1)

      if (exercise.length >= nbQuestions) {
        break
      }
    }

    return exercise

  } catch (e) { return e }
}
