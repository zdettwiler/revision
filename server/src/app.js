import 'dotenv/config'
import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import path from 'path'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import createCustomExercise from './createCustomExercise'
import createDailyExercise from './createDailyExercise'
import correctExercise from './correctExercise'

import db from './db'
import User from './models/user'
import GreekWord from './models/greekword'


const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// get reference to the client build directory
// pass the static files (react app) to the express app.
// console.log(path.join(__dirname, '../../client/build'))
const staticFiles = express.static(path.join(__dirname, '../../../client/build'))
app.use(staticFiles)

/**
 * Login endpoint
 * Need to post json email and password
 * Returns token
 */
app.post('/api/login', async (req, res) => {
  try {
    if (!Object.keys(req.body).includes('email')
    || !Object.keys(req.body).includes('password')) {
      throw 'Credentials not provided.'
    }

    await User.connect()
    var user = User.findOne({
      email: req.body.email
    })

    // console.log(User.uid, req.body.password, user.password)
    if (user === null || !bcrypt.compareSync(req.body.password, user.password)) {
      throw "Credentials don't match."
    }

    delete user.password

    jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1day' }, (err, token) => {
      res.status(200).send({ user: {
        email: user.email,
        username: user.username,
        upToChapter: user.upToChapter,
        lastDailyRevision: user.lastDailyRevision,
        token
      } })
    })

  } catch (err) {
    res.status(401).send({ error: 'Login error: ' + err })
  }

})

/**
 * Create Daily exercise
 */
app.post('/api/revise/today', verifyToken, async (req, res) => {
  try {
    // Get user and needed properties
    await User.connect()
    var user = User.findOne({
      email: req.user.user.email
    })

    // Check user hasn't already revised today
    // let now = new Date()
    // if (now.getFullYear() === lastDailyRevision.getFullYear()
    // && now.getMonth() === lastDailyRevision.getMonth()
    // && now.getDate() === lastDailyRevision.getDate()) {
    //   res.json({ error: "You've already done your daily revision today!" })
    // }

    let dailyExercise = await createDailyExercise(user.upToChapter)
    res.status(200).json(dailyExercise)

  } catch (err) { res.status(500).send({ error: 'Could not create exercise: ' + err }) }
})

/**
 * Correct Exercise
 */
app.post('/api/correction', verifyToken, async (req, res) => {
  // validation here
  // -----

  let correction = await correctExercise(req.user.user._id, req.body.exercise, GreekWord)

  if (correction) {
    res.status(200).send({ info: 'Exercise corrected.' })
  } else {
    res.status(500).send({ error: correction })
  }
})

/**
 * Get all Words for the user
 */
app.post('/api/words', verifyToken, async (req, res) => {
  try {
    await GreekWord.connect()
    let userWords = GreekWord.getData()

    await User.connect()
    let user = User.findOne({
      email: req.user.user.email
    })

    res.status(200).json({
      words: sortByChapter(userWords),
      upToChapter: user.upToChapter
    })

  } catch (err) { res.status(500).send({ error: 'Could not find words. ' + err }) }
})

/**
 * Update known words from tickboxes
 */
app.post('/api/update-known-words', verifyToken, async (req, res) => {
  try {
    await User.connect()
    User.updateRow(
      { email: req.user.user.email },
      { upToChapter: req.body.upToChapter }
    )
    await User.save()

    res.status(200).json({ upToChapter: req.body.upToChapter })

  } catch (err) { res.status(500).send({ error: 'Could not update upToChapter. ' + err }) }
})

/**
 * Search for words
 */
app.post('/api/search-words', verifyToken, async (req, res) => {
  try {
    console.log('needle', req.body.needle)
    await GreekWord.connect()
    let foundWords = GreekWord.find({
      english: { $contains: req.body.needle }
    })

    res.status(200).json({ results: foundWords })

  } catch (err) { res.status(500).send({ error: 'Could not search dictionary. ' + err }) }
})


// API Create exercise
// app.post('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', verifyToken, (req, res) => {
//   res.json(createCustomExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
// })


// testing endpoint
app.get('/api/test', async (req, res) => {
  res.status(200).json({ msg: 'all good' })
})

// handles any other requests
app.get('*', (req, res) => {
  // console.log(path.join(__dirname, '../../../client/build/index.html'))
  res.status(200).sendFile(path.join(__dirname, '../../../client/build', 'index.html'))
})





/**
 * Middleware to verify token and check user is connected
 */
function verifyToken(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader === 'undefined') {
      throw 'No authorization header.'
    }

    const bearerToken = bearerHeader.split(' ')[1]
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        throw err
      }
      req.user = user
      next()
    })
  } catch (err) {
    res.status(403).send({ error: 'Token error: ' + err })
  }
}

/**
 * Helper function to sort by chapter
 */
function sortByChapter(array) {
  return array.sort((a, b) => {
    if (a.chapter < b.chapter) return -1
    if (a.chapter > b.chapter) return 1
    return 0
  })
}

export default app
