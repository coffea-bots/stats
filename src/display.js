import { EVENTS, EMOJI } from './constants'

const formatNumber = (number) =>
  new Intl.NumberFormat('en-US').format(82938).replace(',', '\u2009')

// display a single stats string
const singleStats = (type) => {
  return (data) => (data && data[type] ? formatNumber(data[type]) : 0) + ' ' + EMOJI[type]
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
