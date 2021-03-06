const express = require('express')
const app = express()
const postal = require('node-postal')

const port = 5000

// implement a lenient CORS policy
const cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
}
app.use(cors)

// serve the CRA build as public static assets
app.use(express.static('public'))

// serve libpostal results as a simple API
app.get('/api', (_req, res) => res.send('OK'))

app.get('/api/parse', (req, res) => {
  const { q } = req.query
  if (q === undefined || q.trim().length === 0) {
    res.status(400).send('Param q is required')
  }
  const result = postal.parser.parse_address(req.query.q)
  const dict = result.reduce((acc, val) => {
    acc[val.component] = val.value
    // acc[val.component] = acc[val.component]
    //   ? [...acc[val.component], val.value]
    //   : [val.value]
    return acc
  }, {})
  res.json(dict)
})

app.get('/api/expand', (req, res) => {
  const { q } = req.query
  if (q === undefined || q.trim().length === 0) {
    res.status(400).send('Param q is required')
  }
  const result = postal.expand.expand_address(req.query.q)
  res.json(result)
})

// start the server
app.listen(port, () => console.log(`Web server listening on port ${port}`))
