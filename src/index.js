import dude from 'debug-dude'
const { debug, log, info } = dude('bot')

import { version, homepage } from '../package.json'
info(`statsbot v${version} starting`)

import config from '../config.json'

import { connect } from 'coffea'
const networks = connect(config)

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

const getChatTitle = (evt) =>
  (evt && evt.raw && evt.raw.chat && evt.raw.chat.title) || // telegram
  evt.chat // default

networks.on('command', (evt, reply) => {
  log('received command event: %o', evt)

  switch (evt.cmd) {
    case 'stats':
      console.log(evt)
      reply(
        displayStats({ chat: getChatTitle(evt) }, { chat: evt.chat })
      )
      break
    case 'source':
      reply(
        `statsbot v${version} (protocol independent chat statistics bot) ` +
        ` - Source: ${homepage}`
      )
      break
  }
})
