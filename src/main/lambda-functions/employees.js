const { adaptLambda } = require('../adapters/aws/lambda-adapter.js')
const { makeCreateEmpoyeeController } = require('../factories/controllers/employee/create-employee-controller-factory.js')
const {
  makeGetEmpoyeeController,
} = require('../factories/controllers/employee/get-employee-controller-factory.js')

module.exports.getEmployeeLambda = adaptLambda(makeGetEmpoyeeController())
module.exports.createEmployeeLambda = adaptLambda(makeCreateEmpoyeeController())
