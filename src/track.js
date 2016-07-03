import dude from 'debug-dude'
const { debug } = dude('bot:track')

import _ from 'lodash'

import { updateChat, updateUser } from './db'

// process/track a coffea event
const _processEvent = (type, event) => {
  const { user, chat, raw } = event
  debug(`processing '${type}' event by '${user}' in '${chat}'`)
  debug(' |-> updated chat stats:',
    updateChat(chat, type, raw && raw.chat)
  )
  debug(' `-> updated user stats:',
    updateUser(chat, user, type, raw && raw.from)
  )
}

export const processEvent = _.curry(_processEvent)
