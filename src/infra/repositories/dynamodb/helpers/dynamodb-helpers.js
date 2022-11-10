import AWS from 'aws-sdk'
import { env } from '../../../../main/config/env'
import { tables } from './migrations'

export class DynamoDBHelpers {
  #tables = tables
  #connectionParams = {
    endpoint: env.dynamoDBEndpoint,
    region: env.dynamoDBRegion,
    credentials: {
      accessKeyId: env.awsAccessKeyId,
      secretAccessKey: env.awsSecretAccessKey,
    },
  }

  constructor() {
    this.dynamoDBClient = new AWS.DynamoDB(this.#connectionParams)
  }
  async #existingTables() {
    return (await this.dynamoDBClient.listTables().promise()).TableNames
  }

  async migrate() {
    console.log('Migrating tables...');
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
    console.log('Dropping tables...');
    const existingTables = await this.#existingTables()
    console.log('existingTables', existingTables)
    return Promise.all(
      existingTables.map(async TableName => {
        return await this.dynamoDBClient.deleteTable({TableName}).promise()
      })
    )
  }

  getDocumentClient() {
    return new AWS.DynamoDB.DocumentClient(this.#connectionParams)
  }
}
