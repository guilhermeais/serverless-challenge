const AWS = require('aws-sdk')
const { env } = require('../../../../main/config/env.js')
const { tables } = require('./migrations/index.js')
const isTesting = env.nodeEnv === 'test'
class DynamoDBHelpers {
  #tables = tables
  #connectionParams = {
    ...(isTesting
      ? {
          endpoint: env.dynamoDBEndpoint,
          credentials: {
            accessKeyId: env.awsAccessKeyId,
            secretAccessKey: env.awsSecretAccessKey,
          },
        }
      : {}),
    region: env.dynamoDBRegion,
  }

  constructor() {
    this.dynamoDBClient = new AWS.DynamoDB(this.#connectionParams)
  }
  async #existingTables() {
    return (await this.dynamoDBClient.listTables().promise()).TableNames
  }

  mountUpdateExpressions(objectToUpdate) {
    const UpdateExpression = []
    const ExpressionAttributeNames = {}
    const ExpressionAttributeValues = {}
    Object.keys(objectToUpdate).forEach((key, index) => {
      UpdateExpression.push(`#${key} = :${key}`)
      ExpressionAttributeNames[`#${key}`] = key
      ExpressionAttributeValues[`:${key}`] = objectToUpdate[key]
    })
    return {
      UpdateExpression: `set ${UpdateExpression.join(', ')}`,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    }
  }

  async migrate() {
    console.log('Migrating tables...')
    const existingTables = await this.#existingTables()
    console.log('existingTables', existingTables)
    const tablesToCreate = this.#tables.filter(
      table => !existingTables.includes(table.TableName)
    )
    console.log('tablesToCreate', tablesToCreate)
    return Promise.all(
      tablesToCreate.map(async table =>
        this.dynamoDBClient.createTable(table).promise()
      )
    )
  }

  async drop() {
    console.log('Dropping tables...')
    const existingTables = await this.#existingTables()
    console.log('existingTables', existingTables)
    return Promise.all(
      existingTables.map(async TableName => {
        return await this.dynamoDBClient.deleteTable({ TableName }).promise()
      })
    )
  }

  getDocumentClient() {
    return new AWS.DynamoDB.DocumentClient(this.#connectionParams)
  }
}

module.exports = {
  DynamoDBHelpers,
}
