import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import path from 'path'
import createCustomExercise from './createCustomExercise'
import createDailyExercise from './createDailyExercise'
import correctExercise from './correctExercise'


import db from './db'
import Word from './models/word'
import User from './models/user'

const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// API Create exercise
app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.json(createCustomExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
})

app.get('/api/revise/today', async (req, res) => {
  res.json(await createDailyExercise())
})

// Query words
app.post('/api/words', async (req, res) => {
  let queryResults = await Word.find(req.body.find, '-_id -__v').exec()
  res.status(200).json({ words: queryResults })
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

app.post('/api/login', async (req, res) => {
  if (Object.keys(req.body).includes('email')
  && Object.keys(req.body).includes('password')) {

    try {
      let user = await User.findOne({
        email: req.body.email
      }).exec()

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          username: user.username,
          token: user.token
        })
      } else {
        res.status(200).send({ error: "Credentials don't match." })
      }

    } catch (err) { res.status(500).send({ error: err }) }

  } else if (Object.keys(req.body).includes('email')
  && Object.keys(req.body).includes('token')) {

    try {
      let user = await User.findOne({
        email: req.body.email,
        token: req.body.token
      }).exec()

      if (user) {
        res.status(200).send({ loggedIn: true })
      } else {
        res.status(200).send({ loggedIn: false })
      }

    } catch (err) { res.status(500).send({ error: err }) }

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
