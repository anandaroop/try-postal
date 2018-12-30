const express = require('express')
const app = express()

const port = 3000

app.get('/', (_req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Web server listening on port ${port}`))
