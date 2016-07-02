import dude from 'debug-dude'
const { debug, log, info } = dude('bot')

import { version } from '../package.json'
info(`statsbot v${version} starting`)

import config from '../config.json'

import { connect } from 'coffea'
// const networks = connect(config)
import telegram from '../../coffea-telegram/src/index'
const networks = connect({
  protocol: telegram,
  token: "232512249:AAFVwiBUTlCP4ZiAMOLoJcm3Ol4KFNLheMU"
})

import { EVENTS, EVENT_ALIASES } from './constants'
import { processEvent } from './track'
import { displayStats } from './display'

// listen to an event of a certain type
const listen = (listenType, processType) =>
  networks.on(listenType, processEvent(processType))

// listen to telegram events
debug('listening to events:')
Object.keys(EVENT_ALIASES).map(
  (type) => {
    debug(' - %s -> %s', type, EVENT_ALIASES[type])
    listen(type, EVENT_ALIASES[type])
  }
)
log('collecting stats on the following events: %o', EVENTS)

networks.on('command', (evt, reply) => {
  log('received command event: %o', evt)

  switch (evt.cmd) {
    case 'stats':
      reply(
        displayStats({ chat: evt.chat })
      )
      break
  }
})
