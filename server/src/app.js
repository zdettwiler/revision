import express from 'express'
import createExercise from './createExercise'
import path from 'path'

const app = express()

// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
// pass the static files (react app) to the express app.
app.use(staticFiles)

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.json(createExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
})

app.use('/*', staticFiles)

export default app
