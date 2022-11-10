import AWS from 'aws-sdk'
import { env } from '../../../../main/config/env'
import { tables } from '../migrations'

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
    const existingTables = await this.#existingTables()
    const tablesToCreate = this.#tables.filter(
      table => !existingTables.includes(table.TableName)
    )

    return Promise.all(
      tablesToCreate.map(async table =>
        this.dynamoDBClient.createTable(table).promise()
      )
    )
  }

  async drop() {
    const existingTables = await this.#existingTables()
    const tablesToDelete = this.#tables.filter(table =>
      existingTables.includes(table.TableName)
    )

    return Promise.all(
      tablesToDelete.map(async rawTable => {
        const table = { ...rawTable }
        delete table.AttributeDefinitions
        delete table.KeySchema
        delete table.ProvisionedThroughput
        delete table.StreamSpecification
        return this.dynamoDBClient.deleteTable(table).promise()
      })
    )
  }

  getDocumentClient() {
    return new AWS.DynamoDB.DocumentClient(this.#connectionParams)
  }
}
