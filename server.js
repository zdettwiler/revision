const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/revise/:set/chapters/:chapters/questions/:nbQuestions', (req, res) => {
  res.send(req.params)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
