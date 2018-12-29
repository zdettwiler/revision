import express from 'express'
import createExercise from './createExercise'
import path from 'path'

const app = express()

console.log(path.join(__dirname, '../../client/build'))
// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
// pass the static files (react app) to the express app.
app.use(staticFiles)


// API endpoint
app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.json(createExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
})

// handles any other requests
app.get('*', (req, res) => {
  console.log(path.join(__dirname, '../../client/build/index.html'))
  // res.status(200).sendFile(path.join(__dirname, '../../client/build/index.html'))
})

// app.get('/*', staticFiles)

export default app
