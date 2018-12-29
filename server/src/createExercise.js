// import vocabDuffENTG from '../vocabDuffENTG.json'
const vocabDuffENTG = require('../vocabDuffENTG.json')

function getChaptersArray(chapters) {
  let chaptersArray = []

  // split with comma the different elements of chapter selection
  chapters.split(',').forEach(chap => {
    if (chap.match(/\d+-\d+/g)) { // if range
      let boundaries = chap.match(/\d+/g).map(b => parseInt(b))
      for (let i=boundaries[0]; i<=boundaries[1]; i++) {
        chaptersArray.push(i)
      }
    } else { // if a single chapter
      chaptersArray.push(parseInt(chap))
    }
  })

  return chaptersArray
}

export default function createExercise(set, chapters, nbQuestions) {
  set = vocabDuffENTG
  chapters = getChaptersArray(chapters)

  let exercise = []
  let leftQuestions = set.filter(question => {
    return chapters.includes(question.chapter)
  })
  let nextQuestionId


  while (leftQuestions.length > 0) {
    nextQuestionId = Math.round((leftQuestions.length-1) * Math.random())

    exercise.push({
      question: leftQuestions[nextQuestionId].greek,
      answer: leftQuestions[nextQuestionId].english,
      response: undefined,
      result: undefined
    })

    leftQuestions.splice(nextQuestionId, 1)

    if (exercise.length >= nbQuestions) {
      break
    }
  }

  return exercise
}
