import { expect } from 'chai'
// import mongoose from 'mongoose'
import createDailyExercise from '../src/createDailyExercise'
import db from '../src/db'
import Word from '../src/models/word'
import mockWords from './setup/mockWords'


describe('createDailyExercise()', () => {
  var now = new Date()

  beforeEach(async () => {
    await Word.deleteMany({})

  })

  afterEach(() => {

  })

  it('formats exercise correctly', async () => {
    let ex = await createDailyExercise()

    ex.forEach(q => {
      expect(q).to.have.all.keys('question', 'answer', 'response', 'result')

      expect(q.question).to.be.a('string')
      expect(q.answer).to.be.a('string')
      expect(q.response).to.be.an('undefined')
      expect(q.result).to.be.an('undefined')
    })
  })

  it('picks every-day words ', async () => {
    await Word.create(mockWords[0])

    let ex = await createDailyExercise()

    expect(ex).to.deep.equal([{
      question: "κακος",
      answer: "bad",
      response: undefined,
      result: undefined
    }])
  })

  it('picks every-three-days words ', async () => {
    let fourDaysAgo = new Date()
    fourDaysAgo.setDate(now.getDate() - 4)
    let word = mockWords[1]
    word.lastRevised = fourDaysAgo.toISOString()

    await Word.create(word)

    let ex = await createDailyExercise()

    expect(ex).to.deep.equal([{
      question: "πλοιον",
      answer: "boat",
      response: undefined,
      result: undefined
    }])
  })

  it('picks every-week words ', async () => {
    let eightDaysAgo = new Date()
    eightDaysAgo.setDate(now.getDate() - 8)
    let word = mockWords[2]
    word.lastRevised = eightDaysAgo.toISOString()

    await Word.create(word)

    let ex = await createDailyExercise()

    expect(ex).to.deep.equal([{
      question: "Δαυιδ",
      answer: "David",
      response: undefined,
      result: undefined
    }])
  })

  it('picks every-other-week words ', async () => {
    let fifteenDaysAgo = new Date()
    fifteenDaysAgo.setDate(now.getDate() - 15)
    let word = mockWords[3]
    word.lastRevised = fifteenDaysAgo.toISOString()

    await Word.create(word)

    let ex = await createDailyExercise()

    expect(ex).to.deep.equal([{
      question: "Ἰσρηλ",
      answer: "Israel",
      response: undefined,
      result: undefined
    }])
  })

  after(() => {
    db.disconnect()
  })

})
