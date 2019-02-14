import app from '../src/app'
import { expect } from 'chai'
import request from 'supertest'
// import bodyParser from 'body-parser'
import db from '../src/db'

import Word from '../src/models/word'
import mockWords from './setup/mockWords'
import mockCompletedExercise from './setup/mockCompletedExercise'

describe('API', () => {

  before(async () => {
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
      .expect(200)
      .then(response => {
        console.log(response.body)
        // expect(response.body.).to.equal({ data: 'stuff' })
      }).catch(() => {})
  })

  after(() => {
    db.disconnect()
  })

})
