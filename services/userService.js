const UserModel = require('../models/userModel')
const logger = require('../config/server/logger')
const { AppError } = require('../commons/error')
const exceptions = require('../commons/exceptions')

// PUBLIC FUNCTIONS -----------------------------------------------------

const signup = async (username, password) => {
  logger.info(`signup - userName[${username}]`)

  try {
    return new UserModel({ username, password }).save({ new: true })
  } catch (error) {
    const errorDetails = [{ key: 'username', value: username }]
    throw new AppError(exceptions.exceptionType.user.creationFailed, 'userService.signup', errorDetails)
  }
}

const login = async (username, password) => {
  logger.info(`login - userName[${username}]`)

  // First, search if user exists in db
  const user = await UserModel.findOne({ username })

  // If there is no user with that username, exception is thrown
  if (!user) {
    const errorDetails = [{ key: 'username', value: username }]
    throw new AppError(exceptions.exceptionType.user.invalidUsername, 'userService.login', errorDetails)
  }
  // To check password
  const isMatch = await user.comparePassword(password, user.password)

  if (isMatch) return user

  // If there is no password match, exception is thrown
  const errorDetails = [{ key: 'username', value: username }]
  throw new AppError(exceptions.exceptionType.user.invalidPassword, 'userService.login', errorDetails)
}

module.exports = {
  signup,
  login
}
