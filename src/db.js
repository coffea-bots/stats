import dude from 'debug-dude'
const { log } = dude('bot:db')

import _ from 'lodash'
import low from 'lowdb'
const db = low(DBPATH)

import { DBPATH } from './constants'

// initialize db
db.defaults({ chats: {}, users: {} })
  .value()

// get todays' date in YYYY-MM-DD format
const today = () => (new Date()).toISOString().slice(0, 10)

// get todays' per chat statistics
export const getTodaysChatStats = (chat, type) => {
  const result = db.get(`chats.${chat}.${today()}.${type}`).value()
  return result ? result : 0
}

// get todays' per chat per user statistics
export const getTodaysChatUserStats = (chat, user, type) => {
  const result = db.get(`users.${user}.${chat}.${today()}.${type}`).value()
  return result ? result : 0
}

const deepSum = (data) => {
  if (!data) return null
  return Object.keys(data).reduce( // loop through dates
    (total, date) => {
      Object.keys(data[date]).map( // loop through types
        (type) => {
          if (!total.hasOwnProperty(type)) total[type] = 0
          total[type] += data[date][type]
        }
      )
      return total
    }, {}
  )
}

// get per user statistics
export const getUserStats = (user, type) =>
  deepSum(
    db.get(`users.${user}`)
      .value()
  )

// get per chat statistics
export const getChatStats = (chat, type) =>
  deepSum(
    db.get(`chats.${chat}`)
      .value()
  )

// get per chat statistics
export const getChatUserStats = (chat, user, type) =>
  deepSum(
    db.get(`chats.${chat}.${user}`)
      .value()
  )

const persist = (path) => {
  if (!db.has(path).value()) db.set(path, {}).value()
}

// update per chat statistics
export const updateChat = (chat, type) => {
  persist(`chats.${chat}`)
  persist(`chats.${chat}.${today()}`)
  return db.get(`chats.${chat}.${today()}`)
    .assign({
      [type]: getTodaysChatStats(chat, type) + 1
    })
    .value()
}

// update per user statistics
export const updateUser = (chat, user, type) => {
  persist(`users.${user}`)
  persist(`users.${user}.${chat}`)
  persist(`users.${user}.${chat}.${today()}`)
  return db.get(`users.${user}.${chat}.${today()}`)
    .assign({
      [type]: getTodaysChatUserStats(chat, user, type) + 1
    })
    .value()
}
