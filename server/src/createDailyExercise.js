import UserWord from './models/userword'
import User from './models/user'
import { revisionBoxes } from './constants'


/**
 * need user id to be provided.
 * search in user's words
 */
export default async function createDailyExercise(userId, sheet, nbQuestions=50) {
  try {
    let now = new Date()
    let exercise = []
    var wordsToTest = []

    // Select all of the user's known words
    await sheet.connect()
    let userWords = sheet.getData()


    /*
     * get all words in revisionBox[0] 'every-day'
     * up to chapter upToChapter of the user
     */

    let everyDay = userWords.reduce((acc, cur) => {
      if (cur.revisionBox === revisionBoxes[0]) {
        acc.push(cur)
      }
      return acc
    }, [])
    wordsToTest.push(...everyDay)

    /*
     * get all words in revisionBox[1] 'every-three-days'
     *  - if NOW - 3days < lastRevised add to wordsToTest
     * (= if three days ago is smaller (before) than lastRevised)
     */

    let threeDaysAgo = new Date()
    threeDaysAgo.setDate(now.getDate() - 3)

    let everyThreeDays = userWords.reduce((acc, cur) => {
      if (cur.revisionBox === revisionBoxes[1] && new Date(cur.lastRevised) < threeDaysAgo && cur.lastRevised !== '') {
        acc.push(cur)
      }
      return acc
    }, [])
    wordsToTest.push(...everyThreeDays)

    /*
     * get all words in revisionBox[2] 'every-week'
     *  - if NOW - 7days < lastRevised add to wordsToTest
     * (= if a week ago is smaller (before) than lastRevised)
     */

    let oneWeekAgo = new Date()
    oneWeekAgo.setDate(now.getDate() - 7)

    let everyWeek = userWords.reduce((acc, cur) => {
      if (cur.revisionBox === revisionBoxes[2] && new Date(cur.lastRevised) < oneWeekAgo && cur.lastRevised !== '') {
        acc.push(cur)
      }
      return acc
    }, [])
    wordsToTest.push(...everyWeek)

    /*
     * get all words in revisionBox[3] 'every-other-week'
     *  - if NOW - 14days < lastRevised add to wordsToTest
     * (= if two weeks ago is smaller (before) than lastRevised)
     */

    let twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(now.getDate() - 14)

    let everyOtherWeek = userWords.reduce((acc, cur) => {
      if (cur.revisionBox === revisionBoxes[3] && new Date(cur.lastRevised) < twoWeeksAgo && cur.lastRevised !== '') {
        acc.push(cur)
      }
      return acc
    }, [])
    wordsToTest.push(...everyOtherWeek)

    // take a random selection of available words for exercise
    let nextQuestionId
    while (wordsToTest.length > 0) {
      nextQuestionId = Math.round((wordsToTest.length-1) * Math.random())

      exercise.push({
        // _id: wordsToTest[nextQuestionId].word._id,
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

  } catch (e) { return { error: e } }
}
