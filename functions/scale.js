'use strict'

const config = require('../config')
const scale = require('../lib/scale.js')

function parse (name) {
  const regex = /(OK|ALARM):(.*)MessagesAlarm([0-9]*)/g
  const match = regex.exec(name)

  if (match && match[1]) {
    const direction = match[1] === 'ALARM' ? 1 : -1
    return direction * config.mapping[parseInt(match[3], 10)]
  }

  return 0
}

function handler (event, context, callback) {
  var change = 0

  try {
    change = parse(event.Records[0].Sns.Subject)
  } catch (e) {}

  scale.get().then(
    value => value > 0 ? value : 1
  ).then(
    value => scale.set(value + change)
  ).then(
    value => ({ value, change })
  ).then(
    console.log
  ).then(
    callback
  )
}

module.exports = { parse, handler }
