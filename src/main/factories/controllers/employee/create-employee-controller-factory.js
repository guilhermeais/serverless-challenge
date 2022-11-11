const {
  CreateEmployeeController,
} = require('../../../../presentation/controllers/employees-controller')

const {
  CreateEmployee,
} = require('../../../../domain/usecases/create-employee')
const {
  CreateEmployeeDynamoDBRepository,
  GetEmployeeDynamoDBRepository,
} = require('../../../../infra/repositories/dynamodb')
const {
  DynamoDBHelpers,
} = require('../../../../infra/repositories/dynamodb/helpers/dynamodb-helpers')
const {
  UUIDGenerator,
} = require('../../../../infra/utils/crypto/uuid-generator')
const { ValidationComposite } = require('../../../../validator/validation-composite')
const { 
  RequiredFieldValidation
} = require('../../../../validator/validators/required-filed-validator')

function makeCreateEmpoyeeController() {
  const dynamoDBClient = new DynamoDBHelpers().getDocumentClient()
  const createEmployeeUseCase = new CreateEmployee({
    createEmployeeRepository: new CreateEmployeeDynamoDBRepository({
      dynamoDBClient,
    }),
    getEmployeeRepository: new GetEmployeeDynamoDBRepository({
      dynamoDBClient,
    }),
    uuidGenerator: new UUIDGenerator(),
  })

  const validator = new ValidationComposite(
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('salary'),
    new RequiredFieldValidation('age'),
    new RequiredFieldValidation('role'),
    new RequiredFieldValidation('cpf'),
  )
  
  return new CreateEmployeeController({
    createEmployeeUseCase,
    validator,
  })
}

module.exports = {
  makeCreateEmpoyeeController,
}
