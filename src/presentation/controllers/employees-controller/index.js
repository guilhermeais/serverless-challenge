const { CreateEmployeeController } = require('./create-employee-controller')
const { DeleteEmployeeController } = require('./delete-employee-controller')
const { GetEmployeeController } = require('./get-employee-controller')
const { UpdateEmployeeController } = require('./update-employee-controller')

module.exports = {
  GetEmployeeController,
  CreateEmployeeController,
  DeleteEmployeeController,
  UpdateEmployeeController,
}
