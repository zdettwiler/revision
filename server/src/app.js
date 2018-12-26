import express from 'express'
import createExercise from './createExercise'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.json(createExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
})

export default app
