function badRequest(error) {
  return {
    statusCode: 400,
    body: {
      name: error.name,
      message: error.message
    },
  }
}

function serverError(error) {
  if (error.isDomainError) {  
    return badRequest(error)
  }
  
  return {
    statusCode: 500,
    body: error.stack,
  }
}

function ok(data) {
  return {
    statusCode: 200,
    body: data,
  }
}

module.exports = {
  badRequest,
  serverError,
  ok,
}
