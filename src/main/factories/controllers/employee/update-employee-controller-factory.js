const {
  UpdateEmployeeController,
} = require('../../../../presentation/controllers/employees-controller')

const {
  UpdateEmployee,
} = require('../../../../domain/usecases/update-employee')
const {
  UpdateEmployeeDynamoDBRepository,
  GetEmployeeDynamoDBRepository,
} = require('../../../../infra/repositories/dynamodb')
const {
  DynamoDBHelpers,
} = require('../../../../infra/repositories/dynamodb/helpers/dynamodb-helpers')
const { ValidationComposite } = require('../../../../validator/validation-composite')
const { 
  AtLestOneValueValidation
} = require('../../../../validator/validators/at-least-one-value-validation')

function makeUpdateEmployeeController() {
  const dynamoDBClient = new DynamoDBHelpers().getDocumentClient()
  const updateEmployeeUseCase = new UpdateEmployee({
    updateEmployeeRepository: new UpdateEmployeeDynamoDBRepository({
      dynamoDBClient,
    }),
    getEmployeeRepository: new GetEmployeeDynamoDBRepository({
      dynamoDBClient,
    }),
  })

  const validator = new ValidationComposite(
    new AtLestOneValueValidation([
      'name',
      'salary',
      'age',
      'role',
      'cpf',
    ])
  )
  
  return new UpdateEmployeeController({
    updateEmployeeUseCase,
    validator,
  })
}

module.exports = {
  makeUpdateEmployeeController,
}
