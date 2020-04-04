const UserModel = require('../models/userModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')

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
  return null
  throw new error.AppError(exceptions.exceptionType.user.invalidUserOrPassword, 'userService.login')
}

const findUserById = async id => {
  const user = UserModel.findById(id)
  if (user) {
    return user
  }
  throw new error.AppError(exceptions.exceptionType.user.userNotFound, 'userService.findUserById')
}


const updateUserStatus = async (id, status) => {
  return UserModel.findByIdAndUpdate(id, { $set: { status } }, { new: true })
}

const findUsersByStatus = async (status) => {
  return UserModel.find({ status })
}

// const findUserByToken = async token => {
//   logger.info(`findUserByToken - token[${token}]`)
//   return UserModel.findOne({ recoveryToken: token })
// }

module.exports = {
  createUser,
  login,
  findUserById,
  findUsersByStatus,
  updateUserStatus,
}
