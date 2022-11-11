const {
  DeleteEmployeeController,
} = require('../../../../presentation/controllers/employees-controller')

const {
  DeleteEmployee,
} = require('../../../../domain/usecases/delete-employee')
const {
  DeleteEmployeeDynamoDBRepository, GetEmployeeDynamoDBRepository,
} = require('../../../../infra/repositories/dynamodb')
const {
  DynamoDBHelpers,
} = require('../../../../infra/repositories/dynamodb/helpers/dynamodb-helpers')
const { ValidationComposite } = require('../../../../validator/validation-composite')
const { 
  RequiredFieldValidation
} = require('../../../../validator/validators/required-filed-validator')

function makeDeleteEmpoyeeController() {
  const dynamoDBClient = new DynamoDBHelpers().getDocumentClient()
  const deleteEmployeeUseCase = new DeleteEmployee({
    getEmployeeRepository: new GetEmployeeDynamoDBRepository({
      dynamoDBClient,
    }),
    deleteEmployeeRepository: new DeleteEmployeeDynamoDBRepository({
      dynamoDBClient,
    }),
  })

  const validator = new ValidationComposite(
    new RequiredFieldValidation('id'),
  )
  
  return new DeleteEmployeeController({
    deleteEmployeeUseCase,
    validator,
  })
}

module.exports = {
  makeDeleteEmpoyeeController,
}
