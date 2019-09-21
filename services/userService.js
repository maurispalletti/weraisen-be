// const logger = require('../config/server/logger')(__filename)
const UserModel = require('../models/userModel')
// const exceptions = require('../commons/exceptions')
// const error = require('../commons/error')
// const uuidv4 = require('uuid/v4')

/*****************************************************************************
 ************** PUBLIC FUNCTIONS *********************************************
 *****************************************************************************/

const createUser = async user => {
  // logger.info(`createUser - userName[${user.username}] - userRole[${user.role}]`)

  const newUser = new UserModel(user)
  const savedUser = await newUser.save({ new: true })

  if (savedUser) {
    return { id: savedUser.id }
  }

  throw new error.AppError(exceptions.exceptionType.user.cannotCreateUser, 'userService.createUser')
} 

// const generateRecoveryToken = async username => {
//   logger.info(`generateRecoveryToken - userName[${username}]`)

//   return UserModel.findOneAndUpdate({ username }, { recoveryToken: uuidv4() }, { new: true })
// }

// // TODO: controlar el usuario existente para que no se pueda editar sin pasar por front
// const findUserByUserName = async username => {
//   logger.info(`updateUser - userName[${username}]`)
//   return UserModel.findOne({ username: username })
// }

// const findUserByToken = async token => {
//   logger.info(`findUserByToken - token[${token}]`)
//   return UserModel.findOne({ recoveryToken: token })
// }

// const login = async (username, password) => {
//   logger.info(`login - username[${username}]`)
//   const user = await UserModel.findOne({ username })
//   const isMatch = user && (await user.comparePassword(password, user.password))
//   if (isMatch) {
//     return user
//   }
//   throw new error.AppError(exceptions.exceptionType.user.invalidUserOrPassword, 'userService.login')
// }

// const recoverPassword = async (token, password) => {
//   logger.info(`recoverPassword - token[${token}]`)

//   const user = await UserModel.findOneAndUpdate(
//     { recoveryToken: token },
//     { $set: { password, recoveryToken: null } },
//     { new: true }
//   )

//   return user
// }

module.exports = {
  createUser,
  findUserByUserName,
  login,
  generateRecoveryToken,
  findUserByToken,
  recoverPassword
}
