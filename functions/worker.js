'use strict'

const AWS = require('aws-sdk')
const LAMBDA = new AWS.Lambda({apiVersion: '2015-03-31'})

const scale = require('../lib/scale.js')

module.exports.handler = function (event, context, callback) {
  scale.get().then(
    count => Array.apply(null, Array(count)).map(
      (_, index) => LAMBDA.invoke(
        {
          FunctionName: process.env.process,
          InvocationType: 'Event',
          LogType: 'None'
        },
        () => {
          console.log('started', index + 1)
        }
      )
    ).length
  ).then(
    count => ({ count })
  ).then(
    console.log
  ).then(
    callback
  )
}
