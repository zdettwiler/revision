import { expect } from 'chai'
import correctExercise from '../src/correctExercise'
import db from '../src/db'
import Word from '../src/models/word'

import mockWords from './setup/mockWords'
import mockCompletedExercise from './setup/mockCompletedExercise'


describe('correctExercise()', () => {

  beforeEach(async () => {
    // create test word set
    await Word.deleteMany({}).exec()
    await Word.create(mockWords)
  })

  it('updates lastRevised date', async () => {
    try {
      await correctExercise(mockCompletedExercise)
      let wordRecord = await Word.findOne({}).exec()

      expect(new Date() - wordRecord.lastRevised).to.be.below(1000) // milliseconds

    } catch (err) { throw err }
  })

  it('updates to next revisionBox when result is right', async () => {
    try {
      await correctExercise(mockCompletedExercise)
      let wordRecord = await Word.findOne({ greek: mockCompletedExercise[0].question })

      expect(wordRecord.revisionBox).to.equal('every-three-days')

    } catch (err) { throw err }
  })

  it('updates to next revisionBox when result is right 2', async () => {
    try {
      await correctExercise(mockCompletedExercise)
      let wordRecord = await Word.findOne({ greek: mockCompletedExercise[1].question })

      expect(wordRecord.revisionBox).to.equal('every-week')

    } catch (err) { throw err }
  })

  it('updates to next every-day revisionBox when result is wrong', async () => {
    mockCompletedExercise[2].result = false
    try {
      await correctExercise(mockCompletedExercise)
      let wordRecord = await Word.findOne({ greek: mockCompletedExercise[2].question })

      expect(wordRecord.revisionBox).to.equal('every-day')

    } catch (err) { throw err }
  })

  after(() => {
    db.disconnect()
  })

})
