const exceptions = require('../commons/exceptions')

class AppError extends Error {
  constructor (exceptionType, description, errorDetails) {
    // TODO: messageParameter parameter must be removed after full error response refactor
    super()
    Error.captureStackTrace(this, this.constructor)

    // Application error attributes
    this.appCode = exceptionType.code
    this.message = exceptionType.message
    this.httpStatus = exceptionType.httpStatus
    if (description) this.description = description
    if (errorDetails) this.errorDetails = errorDetails
  }
}

const errorHandler = (res, ex) => {
  if (!(ex instanceof AppError)) {
    if (ex.statusCode === 404) {
      ex = new AppError(exceptions.exceptionType.notFound)
    } else {
      ex = new AppError(exceptions.exceptionType.unhandledException, ex.message)
    }
  }
  const status = ex.httpStatus
  delete ex.httpStatus
  res.status(status).json(ex)
}

module.exports = {
  AppError,
  errorHandler
}

/*
New error response structure:

error = {
  appCode: appCode,         (required)
  message: message,         (required)
  description: description, (optional)
  errorDetails: [           (optional)
    {                       (required)
      key: key,
      value: value
    },
    {
      key: key,
      value: value
    }
  ]
}
*/
