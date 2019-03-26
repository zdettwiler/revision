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
import Word from './models/word'
import User from './models/user'
import UserWord from './models/userword'


const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


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

    var user = await User.findOne({
      email: req.body.email
    }, '_id username password email').exec()

    if (user === null || !bcrypt.compareSync(req.body.password, user.password)) {
      throw "Credentials don't match."
    }

    user.password = null
    // delete doesn't work...
    delete user.password

    jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1day' }, (err, token) => {
      res.status(200).send({ user, token })
    })

  } catch (err) {
    res.status(401).send({ error: err })
  }

})

/**
 * Update UserWords with Words
 */
app.post('/api/update-user-words', verifyToken, async (req, res) => {
  const userId = req.user.user._id

  try {
    let words = await Word.find({}, '-__v').exec()

    for (let word of words) {
      await UserWord.findOneAndUpdate(
        { user: userId, word: word._id },
        {
          user: userId,
          word: word._id,
          entry: word.greek
        },
        {
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true
        }
      ).exec()
    }

    res.status(200).send({ info: words.length + " words have been added/updated to user's words." })

  } catch(err) { res.status(500).send({ error: "Could not update user's words. " + err }) }
})

// API Create exercise
// app.post('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', verifyToken, (req, res) => {
//   res.json(createCustomExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
// })

/**
 * Create Daily exercise
 */
app.post('/api/revise/today', verifyToken, async (req, res) => {
  // Get user and needed properties
  let user = await User.findById(req.user.user._id, 'lastDailyRevision').exec()
  let lastDailyRevision = user.lastDailyRevision

  // Check user hasn't already revised today
  // let now = new Date()
  // if (now.getFullYear() === lastDailyRevision.getFullYear()
  // && now.getMonth() === lastDailyRevision.getMonth()
  // && now.getDate() === lastDailyRevision.getDate()) {
  //   res.json({ error: "You've already done your daily revision today!" })
  // }

  // return exercise
  res.json(await createDailyExercise(req.user.user._id))
})

/**
 * Correct Exercise
 */
app.post('/api/correction', verifyToken, async (req, res) => {
  // validation here
  // -----
  // find user and update lastDailyRevision date
  try {
    await User.findByIdAndUpdate(
      req.user.user._id,
      {
        $set: { lastDailyRevision: new Date().toISOString() }
      },
      {
        new: false, // don't return updated doc
        runValidators: true // validate before update
      }
    ).exec()
  } catch (err) { res.status(500).send({ error: 'Could not update user revision date. ' + err }) }

  if (await correctExercise(req.user.user._id, req.body.exercise)) {
    res.status(200).send({ info: 'Exercise corrected.' })
  } else {
    res.status(500).send({ error: 'Something went wrong!' })
  }
})

/**
 * Get all Words for the user
 */
app.post('/api/words', verifyToken, async (req, res) => {
  try {
    // let queryResults = await Word.find(req.body.find, '-__v').exec()
    let queryResults = await UserWord.find({ user: req.user.user._id }, '-_id -__v')
      .populate('word')
      // .sort({'word.chapter': 1})
      .exec()
    res.status(200).json({ words: sortByChapter(queryResults) })
  } catch (err) { res.status(500).send({ error: 'Could not find words. ' + err }) }
})

/**
 * Update known words
 */
app.post('/api/update-known-words', verifyToken, async (req, res) => {
  try {
    await Promise.all(req.body.knownWords.map(word => {
      UserWord.findOneAndUpdate(
        { word: word._id },
        { $set: { known: word.known } }
      ).exec()
    }))

    // collect words again and send back
    let queryResults = await UserWord.find({ user: req.user.user._id }, '-_id -__v')
      .populate('word')
      .exec()
    res.status(200).json({ words: sortByChapter(queryResults) })
  } catch (err) { res.status(500).send({ error: 'Could not find words. ' + err }) }
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
    res.sendStatus(403)
  }
}


// testing endpoint
app.post('/test', verifyToken, async (req, res) => {
  const userWord = new UserWord({
    word: "5c8cf91bf9900e141acabb0c",
    user: "5c6ee702fb6fc01c4ce9a245"
  })

  try {

    await userWord.save().exec()

  } catch (err) { res.send(err) }

  // try {
  //   console.log(req.user.user._id)
  //
  //   let word = await UserWord.find({ user: req.user.user._id })
  //     .populate('word')
  //     .exec()
  //
  //   res.send(word)
  //
  // } catch (err) { res.send(err) }


})

// handles any other requests
app.get('*', (req, res) => {
  console.log(path.join(__dirname, '../../../client/build/index.html'))
  res.status(200).sendFile(path.join(__dirname, '../../../client/build/index.html'))
})

function sortByChapter(array) {
  return array.sort((a, b) => {
    if (a.word.chapter < b.word.chapter) return -1
    if (a.word.chapter > b.word.chapter) return 1
    return 0
  })
}

// get reference to the client build directory
// pass the static files (react app) to the express app.
console.log(path.join(__dirname, '../../client/build'))
const staticFiles = express.static(path.join(__dirname, '../../../client/build'))
app.use(staticFiles)

export default app
