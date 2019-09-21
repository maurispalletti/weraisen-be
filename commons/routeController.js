// const error = require('../commons/error')
// const logger = require('../config/server/logger')

// Function used to serve as request handler, and to manage errors
async function handleRequest (req, res, methodController, next) {
  try {
    // logger.info(`handleRequest - controllerMethodName[${methodController.name}]`)
    await methodController(req, res, next)
  } catch (ex) {
    console.error(ex.message)
    // logger.error(`handleRequest - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`)
    // error.errorHandler(res, ex)
  }
}

module.exports = {
  handleRequest
}
