import dude from 'debug-dude'
const { debug, log, info } = dude('bot')

import { version, homepage } from '../package.json'
info(`statsbot v${version} starting`)

import config from '../config.json'

import { connect } from 'coffea'
const networks = connect(config)

import { EVENTS, EVENT_ALIASES } from './constants'
import {
  getUserStats, getChatStats, getChatUserStats,
  getAvgUserStats, getAvgChatStats, getAvgChatUserStats
} from './db'
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

const getChatName = (evt) =>
  (evt && evt.raw && evt.raw.chat && evt.raw.chat.title) || // telegram
  evt.chat // default

const getUserName = (evt) => {
  if (evt && evt.raw && evt.raw.from && evt.raw.from.username) { // telegram
    return '@' + evt.raw.from.username
  } else {
    return evt.user // default
  }
}

networks.on('command', (evt, reply) => {
  log('received command event: %o', evt)

  const userName = getUserName(evt)
  const chatName = getChatName(evt)

  switch (evt.cmd) {
    case 'stats':
      reply(
        `stats for chat ${chatName}: ` +
        displayStats(getChatStats(evt.chat))
      )
      break

    case 'mystats':
      reply(
        `stats for ${userName} in ${chatName}: ` +
        displayStats(getChatUserStats(evt.chat, evt.user))
      )
      break

    case 'avgstats':
      reply(
        `average daily stats for chat ${chatName}: ` +
        displayStats(getAvgChatStats(evt.chat))
      )
      break

    case 'myavgstats':
      reply(
        `average daily stats for ${userName} in ${chatName}: ` +
        displayStats(getAvgChatUserStats(evt.chat, evt.user))
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
