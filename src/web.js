import dude from 'debug-dude'
const { info } = dude('bot:web')

import express from 'express'
const app = express()

import { dump } from './db'
import { PORT } from './constants'

app.use(express.static('public'))

app.get('/stats.json', (req, res) => res.send(dump()))

app.listen(PORT, () => {
  info(`api running on port ${PORT}`)
  info(` \`-> you can try accessing http://localhost:${PORT}`)
})
