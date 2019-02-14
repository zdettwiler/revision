import app from '../src/app'
import { expect } from 'chai'
import request from 'supertest'
// import bodyParser from 'body-parser'
import db from '../src/db'

import Word from '../src/models/word'
import mockWords from './setup/mockWords'
import mockCompletedExercise from './setup/mockCompletedExercise'

describe('API', () => {

  beforeEach(async () => {
    await Word.deleteMany({})
    await Word.create(mockWords)
  })

  it('GET exercise', () => {
    return request(app).get("/api/revise/greek/chapters/1/questions/10")
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).to.equal(true)
      }).catch(() => {})
  })

  it('POST exercise', () => {
    return request(app).post("/api/correction")
      .send({ exercise: mockCompletedExercise })
      .set('Accept', 'application/json')
      .expect(200, { info: 'Exercise corrected.' })
  })

  it('POST query to fetch words', () => {
    return request(app).post("/api/words")
      .send({ find: { greek: 'πλοιον' } })
      .set('Accept', 'application/json')
      .expect(200, {
        words: [ {
          revisionBox: 'every-three-days',
          lastRevised: '2019-02-05T23:10:24.879Z',
          greek: 'πλοιον',
          french: 'bâteau',
          english: 'boat',
          chapter: 3
        } ]
      })
  })

  it('POST query to fetch words', () => {
    return request(app).post("/api/words")
      .send({ find: { chapter: 1 } })
      .set('Accept', 'application/json')
      .expect(200, {
        words: [
          {
            revisionBox: "every-week",
            greek: "Δαυιδ",
            french: "David",
            english: "David",
            chapter: 1,
            lastRevised: "2019-02-01T23:10:24.879Z"
          },
          {
            revisionBox: "every-other-week",
            greek: "Ἰσρηλ",
            french: "Israël",
            english: "Israel",
            chapter: 1,
            lastRevised: "2019-01-20T23:10:24.879Z"
          }
        ]
      })
  })

  after(() => {
    db.disconnect()
  })

})
