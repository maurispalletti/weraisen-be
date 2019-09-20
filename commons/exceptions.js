const exceptionType = {
    missingParameters: {
      message: 'Missing required fields',
      code: 1000,
      httpStatus: 422
    },
    numbersParameters: {
      message: 'Fields must be numbers',
      code: 1001,
      httpStatus: 422
    },
    notFound: {
      message: 'Not found',
      code: 1002,
      httpStatus: 404
    },
    unhandledException: {
      code: 1003,
      message: 'Unhandled exception',
      httpStatus: 500
    },
    user: {
      creationFailed: {
        code: 2200,
        message: 'User creation failed',
        httpStatus: 422
      },
      invalidUsername: {
        code: 2201,
        message: 'Invalid username',
        httpStatus: 401
      },
      invalidPassword: {
        code: 2202,
        message: 'Invalid password',
        httpStatus: 401
      }
    },
    token: {
      invalidToken: {
        code: 2300,
        message: 'Invalid token',
        httpStatus: 401
      }
    },
  }
  
  module.exports = {
    exceptionType
  }
  