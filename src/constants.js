import { emoji } from 'node-emoji'

export const DBPATH = 'stats.json'
export const PORT = 9697

export const EVENT_ALIASES = {
  'message': 'message',
  'command': 'command',
  'audio': 'audio',
  'voice': 'audio',
  'video': 'video',
  'photo': 'photo',
  'sticker': 'sticker'
}
export const EVENTS = Object.keys(EVENT_ALIASES).reduce(
  (events, key) => {
    const evt = EVENT_ALIASES[key]
    if (events.indexOf(evt) === -1) return events.concat(evt)
    else return events
  }, []
)

export const EMOJI = {
  'message': emoji.speech_balloon,
  'command': emoji.thought_balloon,
  'audio': emoji.sound,
  'video': emoji.movie_camera,
  'photo': emoji.mount_fuji,
  'sticker': emoji.rainbow
}
