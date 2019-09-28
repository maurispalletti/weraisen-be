const UserModel = require('../models/userModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

const createUser = async user => {
  const newUser = new UserModel(user)
  const savedUser = await newUser.save({ new: true })

  if (savedUser) {
    return { id: savedUser.id }
  }

  throw new error.AppError(exceptions.exceptionType.user.cannotCreateUser, 'userService.createUser')
}

const login = async (email, password) => {
  const user = await UserModel.findOne({ email, password })

  if (user) {
    return user
  }

  throw new error.AppError(exceptions.exceptionType.user.invalidUserOrPassword, 'userService.login')
}

// const findUserByUserName = async username => {
//   logger.info(`updateUser - userName[${username}]`)
//   return UserModel.findOne({ username: username })
// }

// const findUserByToken = async token => {
//   logger.info(`findUserByToken - token[${token}]`)
//   return UserModel.findOne({ recoveryToken: token })
// }

module.exports = {
  createUser,
  login
  // findUserByUserName,
  // findUserByToken,
}
