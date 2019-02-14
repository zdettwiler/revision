import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import createCustomExercise from './createCustomExercise'
import createDailyExercise from './createDailyExercise'
import correctExercise from './correctExercise'


import db from './db'
import Word from './models/word'

const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// API Create exercise
app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.json(createCustomExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
})

// Correct exercise
app.post('/api/correction', async (req, res) => {
  // validation here
  // -----
  if (await correctExercise(req.body.exercise)) {
    res.status(200).send({ info: 'Exercise corrected.' })
  } else {
    res.status(500).send({ error: 'Something went wrong!' })
  }
})


// testing endpoint
app.get('/test', async (req, res) => {
  res.send(await createDailyExercise())
})

// handles any other requests
app.get('*', (req, res) => {
  console.log(path.join(__dirname, '../../../client/build/index.html'))
  res.status(200).sendFile(path.join(__dirname, '../../../client/build/index.html'))
})


// get reference to the client build directory
// pass the static files (react app) to the express app.
console.log(path.join(__dirname, '../../client/build'))
const staticFiles = express.static(path.join(__dirname, '../../../client/build'))
app.use(staticFiles)


export default app
