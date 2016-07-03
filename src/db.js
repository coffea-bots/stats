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
  if (!data) return {}
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

const deepAvg = (data) => {
  if (!data) return {}

  const daysAmount = Object.keys(data).length
  const sumData = deepSum(data)

  return Object.keys(sumData).reduce(
    (result, key) => {
      result[key] = sumData[key] / daysAmount
      return result
    }, {}
  )
}

// get per user statistics
export const getUserStats = (user) =>
  deepSum(
    db.get(`users.${user}`)
      .value()
  )

// get per chat statistics
export const getChatStats = (chat) =>
  deepSum(
    db.get(`chats.${chat}`)
      .value()
  )

// get per user per chat statistics
export const getChatUserStats = (chat, user) =>
  deepSum(
    db.get(`users.${user}.${chat}`)
      .value()
  )

// get average per user statistics
export const getAvgUserStats = (chat) =>
  deepAvg(
    db.get(`users.${user}`)
      .value()
  )

// get average per chat statistics
export const getAvgChatStats = (chat) =>
  deepAvg(
    db.get(`chats.${chat}`)
      .value()
  )

// get average per user per chat statistics
export const getAvgChatUserStats = (chat, user) =>
  deepAvg(
    db.get(`users.${user}.${chat}`)
      .value()
  )

const persist = (path) => {
  if (!db.has(path).value()) db.set(path, {}).value()
}

// update per chat statistics
export const updateChat = (chat, type, meta) => {
  persist(`chats.${chat}`)

  // update metadata
  db.get(`chats.${chat}`)
    .assign({ meta })
    .value()

  persist(`chats.${chat}.${today()}`)
  return db.get(`chats.${chat}.${today()}`)
    .assign({
      [type]: getTodaysChatStats(chat, type) + 1
    })
    .value()
}

// update per user statistics
export const updateUser = (chat, user, type, meta) => {
  persist(`users.${user}`)

  // update metadata
  db.get(`users.${user}`)
    .assign({ meta })
    .value()

  persist(`users.${user}.${chat}`)
  persist(`users.${user}.${chat}.${today()}`)
  return db.get(`users.${user}.${chat}.${today()}`)
    .assign({
      [type]: getTodaysChatUserStats(chat, user, type) + 1
    })
    .value()
}

export const dump = () => db.getState()
