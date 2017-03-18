'use strict'

const scale = require('../functions/scale.js')

const mapping = [
  { name: 'ALARM: "sqs-worker-serverless-dev-MessagesAlarm1-1NIBQAPLRXXF6', change: 1 },
  { name: 'OK: "sqs-worker-serverless-dev-MessagesAlarm1-1NIBQAPLRXXF6', change: -1 },
  { name: 'ALARM: "sqs-worker-serverless-dev-MessagesAlarm100-1NIBQAPLRXXF6', change: 2 },
  { name: 'OK: "sqs-worker-serverless-dev-MessagesAlarm100-1NIBQAPLRXXF6', change: -2 },
  { name: 'ALARM: "sqs-worker-serverless-dev-MessagesAlarm1000-1NIBQAPLRXXF6', change: 5 },
  { name: 'OK: "sqs-worker-serverless-dev-MessagesAlarm1000-1NIBQAPLRXXF6', change: -5 },
  { name: 'ALARM: "sqs-worker-serverless-dev-MessagesAlarm2000-1NIBQAPLRXXF6', change: 10 },
  { name: 'OK: "sqs-worker-serverless-dev-MessagesAlarm2000-1NIBQAPLRXXF6', change: -10 },
  { name: 'LOREM: "sqs-worker-serverless-dev-MessagesAlarm2000-1NIBQAPLRXXF6', change: 0 }
]

it('should convert alert to change', () => {
  mapping.forEach(element => {
    expect(scale.parse(element.name)).toBe(element.change)
  })
})
