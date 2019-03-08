import Word from './models/word'
import User from './models/user'
import { revisionBoxes } from './constants'

export default async function createDailyExercise(nbQuestions=10, upToChapter=1) {
  try {

    let user = await User.findOne({
      "email": ""
    }).exec()
    let lastDailyRevision = user.lastDailyRevision
    let now = new Date()

    if (now.getFullYear() === lastDailyRevision.getFullYear()
    && now.getMonth() === lastDailyRevision.getMonth()
    && now.getDate() === lastDailyRevision.getDate()) {
      return { error: "You've already done your daily revision today!" }
    }

    let exercise = []
    var wordsToTest = []

    /*
     * get all words in revisionBox[0] 'every-day'
     * up to chapter upToChapter of the user
     */

    let everyDay = await Word.find({
      revisionBox: revisionBoxes[0],
      chapter: { $lte: upToChapter }
    }).exec()
    wordsToTest.push(...everyDay)

    /*
     * get all words in revisionBox[1] 'every-three-days'
     *  - if NOW - 3days < lastRevised add to wordsToTest
     * (= if lastRevised is more than three days ago)
     */

    let threeDaysAgo = new Date()
    threeDaysAgo.setDate(now.getDate() - 3)

    let everyThreeDays = await Word.find({
      revisionBox: revisionBoxes[1],
      lastRevised: { $lte: threeDaysAgo.toISOString(), $ne: '' }
    }).exec()
    wordsToTest.push(...everyThreeDays)

    /*
     * get all words in revisionBox[2] 'every-week'
     *  - if NOW - 7days < lastRevised add to wordsToTest
     * (= if lastRevised is more than a week ago)
     */

    let oneWeekAgo = new Date()
    oneWeekAgo.setDate(now.getDate() - 7)

    let everyWeek = await Word.find({
      revisionBox: revisionBoxes[2],
      lastRevised: { $lte: oneWeekAgo.toISOString(), $ne: '' }
    }).exec()
    wordsToTest.push(...everyWeek)

    /*
     * get all words in revisionBox[3] 'every-other-week'
     *  - if NOW - 14days < lastRevised add to wordsToTest
     * (= if lastRevised is more than two weeks ago)
     */

    let twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(now.getDate() - 7)

    let everyOtherWeek = await Word.find({
      revisionBox: revisionBoxes[3],
      lastRevised: { $lte: twoWeeksAgo.toISOString(), $ne: '' }
    }).exec()
    wordsToTest.push(...everyOtherWeek)

    // take a random selection of available words for exercise
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
