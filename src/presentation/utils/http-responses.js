function badRequest(error) {
  return {
    statusCode: 400,
    body: error,
  }
}

function serverError(error) {
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
