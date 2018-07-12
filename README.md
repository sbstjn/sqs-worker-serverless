# SQS Worker with Serverless ⚡️

[![MIT License](https://badgen.now.sh/badge/License/MIT/blue)](https://github.com/sbstjn/sqs-worker-serverless/blob/master/LICENSE.md)
[![Read Tutorial](https://badgen.now.sh/badge/Read/Tutorial/orange)](https://sbstjn.com/serverless-sqs-worker-with-aws-lambda.html)


Experimental [Serverless Amazon SQS Worker with AWS Lambda](https://sbstjn.com/serverless-sqs-worker-with-aws-lambda.html).

***Update:** Please see [Serverless Analytics](https://github.com/sbstjn/serverless-analytics) for a more realistic setup using Amazon Kinesis Streams to process your data and events. You can read more about the Kinesis and Lambda connection at [Serverless Analytics with Amazon Kinesis and AWS Lambda](https://sbstjn.com/serverless-analytics-with-kinesis-stream-lambda.html). This was only intended as an April Fools' project …* 

## Setup

- SQS Queue with your messages
- SNS Topic to handle CloudWatch Alarms
- DynamoDB table to persist configuration
- CloudWatch Schedule as cron replacement
- Three (`scale`, `worker`, `process`) AWS Lambda functions

## Workflow

- CloudWatch Alarms on queue length post to SNS
- SNS Topic triggers `scale` Lambda function
- Function `scale` updates configuration in DynamoDB 
- CloudWatch Schedule invokes `worker` every `x` minute(s)
- Function `worker` reads configuration from DynamoDB
- Function `worker` invokes `process` function(s)

## Auto-Scaling with CloudWatch Alerts

![](./docs/scale.png) 

## Workers with CloudWatch Schedule

![](./docs/worker.png)

## Deploy

```bash
$ > yarn install
$ > yarn deploy
```

## Add noise to SQS

You should have some data in your queue to test this setup. Use [wrk](https://github.com/wg/wrk) to send messages to SQS, but make sure to enable [anonymous access to sendMessage](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/acp-overview.html#anonQueues) for your queue first!

```
$ > wrk -c35 -d60 -t35 \
    -s helpers/wrk.lua \
    https://sqs.REGION.amazonaws.com/ACCOUNT-ID/YourQueueName
```
