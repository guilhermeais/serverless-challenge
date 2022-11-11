require('dotenv').config(
  {
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  }
)

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  dynamoDBEndpoint: process.env.DYNAMODB_ENDPOINT,
  dynamoDBRegion: process.env.DYNAMODB_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

module.exports = {
  env
}