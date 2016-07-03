import { getUserStats, getChatStats, getChatUserStats } from './db'
import { EVENTS, EMOJI } from './constants'

// display a single stats string
const singleStats = (type) => {
  return (data) => (data && data[type] ? data[type] : 0) + ' ' + EMOJI[type]
}

// display all stats
const stats = (data) => {
  const statsFunctions = EVENTS.map(singleStats)
  return statsFunctions.map(
    (fn) => fn(data)
  )
}

const displaySingleStats = (data) =>
  stats(data).join(' | ')

// display stats for a certain user/chat
export const displayStats = ({ chat: chatName, user: userName }, { chat, user }) => {
  if (chat && user) {
    return `stats for ${userName} in ${chatName}: ${displaySingleStats(getChatUserStats(chat, user))}`
  } else if (chat) {
    return `stats for chat ${chatName}: ${displaySingleStats(getChatStats(chat))}`
  } else if (user) {
    return `stats for user ${userName}: ${displaySingleStats(getUserStats(user))}`
  } else {
    throw new Error(
      'invalid arguments to displayStats: ' +
      'either `chat` or `user` parameter (or both) required'
    )
  }
}
