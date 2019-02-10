import express from 'express'
import path from 'path'
import createCustomExercise from './createCustomExercise'
import createDailyExercise from './createDailyExercise'


import db from './db'
import Word from './models/word'

const app = express()

// API endpoint
app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.json(createCustomExercise(req.params.set, req.params.chapters, req.params.nbQuestions))
})

// testing endpoint
app.get('/test', async (req, res) => {
  res.send(await createDailyExercise())
  // let word = new Word({
  //   greek: 'κακος',
  //   french: 'mauvais',
  //   english: 'bad',
  //   chapter: 2
  // })

  // let word = new Word({
  //   greek: 'πλοιον',
  //   french: 'bâteau',
  //   english: 'boat',
  //   chapter: 3
  // })

  // word.save()
  //   .then(doc => {
  //     res.send(doc)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })

  // Word.find({
  //   revisionBox: 'every-day'
  // }).limit(5)
  // .then(doc => {
  //   res.send(doc)
  // })
  // .catch(err => {
  //   res.send(err)
  // })
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
