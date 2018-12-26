import app from '../src/app'
import request from 'supertest'

it('returns the GET method', () => {
  return request(app).get("/")
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.text).toBe('Hello World!')
    })
})

it('returns the GET method', () => {
  return request(app).get("/api/revise/greek/chapters/1/questions/10")
    .then(response => {
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
})
