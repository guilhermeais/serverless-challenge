import dotenv from 'dotenv'
dotenv.config(
  {
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  }
)

export const env = {
  port: process.env.PORT,
  dynamoDBEndpoint: process.env.DYNAMODB_ENDPOINT,
  dynamoDBRegion: process.env.DYNAMODB_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}