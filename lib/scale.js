'use strict'

const AWS = require('aws-sdk')
const DDB = new AWS.DynamoDB.DocumentClient()

module.exports = {
  get: () => DDB.get(
    {
      TableName: process.env.config,
      Key: {
        'key': 'scale'
      }
    }
  ).promise().then(
    res => res.Item.value
  ).catch(
    _ => 1
  ),

  set: scale => DDB.put(
    {
      TableName: process.env.config,
      Item: {
        'key': 'scale',
        'value': scale,
        'changed': '' + new Date().toISOString()
      }
    }
  ).promise().then(
    () => scale
  )
}
