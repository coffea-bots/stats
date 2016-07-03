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

export const displayStats = (data) =>
  stats(data).join(' | ')
