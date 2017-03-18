'use strict'

const AWS = require('aws-sdk')
const SQS = new AWS.SQS({apiVersion: '2012-11-05'})

const Lawos = require('lawos')

module.exports.handler = function (event, context, callback) {
  const queueUrl = 'https://sqs.' + process.env.region + '.amazonaws.com/' + require('alai').parse(context) + '/'
  const Q = new Lawos(queueUrl + process.env.sqs, SQS)

  Q.item(
    item => new Promise(resolve => {
      resolve()
    })
  )

  Q.work(
    () => Promise.resolve(context.getRemainingTimeInMillis() < 1000)
  ).then(
    console.log
  ).then(
    callback
  )
}
