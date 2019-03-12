import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import path from 'path'
import jwt from 'jsonwebtoken'

import createCustomExercise from './createCustomExercise'
import createDailyExercise from './createDailyExercise'
import correctExercise from './correctExercise'

import db from './db'
import Word from './models/word'
import User from './models/user'


const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


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

    jwt.sign({ user }, 'secretkey', { expiresIn: '1day' }, (err, token) => {
      res.status(200).send({ user, token })
    })

  } catch (err) {
    res.status(401).send({ error: err })
  }

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
  let user = await User.findById(req.user.user._id, 'lastDailyRevision upToChapter').exec()
  let lastDailyRevision = user.lastDailyRevision
  let upToChapter = user.upToChapter

  // Check user hasn't already revised today
  let now = new Date()
  if (now.getFullYear() === lastDailyRevision.getFullYear()
  && now.getMonth() === lastDailyRevision.getMonth()
  && now.getDate() === lastDailyRevision.getDate()) {
    res.json({ error: "You've already done your daily revision today!" })
  }

  // return exercise
  res.json(await createDailyExercise(upToChapter))
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


  if (await correctExercise(req.body.exercise)) {
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
    let queryResults = await Word.find(req.body.find, '-_id -__v').exec()
    res.status(200).json({ words: queryResults })
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
    jwt.verify(bearerToken, 'secretkey', (err, user) => {
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
  res.json({ test: 'testing', authData: req.authData })
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
