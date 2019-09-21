const userService = require('../services/userService')

// const logger = require('../config/server/logger')(__filename)
// const candidateService = require('../services/candidateService')
// const talentPartnerService = require('../services/talentPartnerService')
// const emailDelegate = require('../delegates/emailDelegate')
// const constants = require('../commons/constants')
// const jwt = require('jsonwebtoken')
// const config = require('config')
// const error = require('../commons/error')
// const exceptions = require('../commons/exceptions')

// const createUser = data => {
//   logger.info(`createUser - data[${JSON.stringify(data)}]`)

//   return userService.createUser(data)
// }

// const generateRecoveryToken = async username => {
//   logger.info(`generateRecoveryToken - username[${username}]`)

//   const updatedUser = await userService.generateRecoveryToken(username)

//   if (updatedUser) {
//     let name
//     switch (updatedUser.role) {
//       case constants.users.role.TALENT_PARTNER:
//         const talentPartner = await talentPartnerService.getTalentPartnerByUserId(updatedUser.id)
//         name = talentPartner.name
//         break
//       case constants.users.role.CANDIDATE:
//         const candidate = await candidateService.getCandidateByUserId(updatedUser.id)
//         name = candidate.name
//         break
//       default:
//         throw new error.AppError(exceptions.exceptionType.user.invalidRole, 'userDelegate.generateRecoveryToken', [
//           { key: 'role', value: updatedUser.role }
//         ])
//     }

//     const recoveryUrl = config.get('domain') + constants.passwordRecovery.emailUrl + updatedUser.recoveryToken

//     emailDelegate.sendRecoveryPasswordEmail(username, recoveryUrl, name)
//   }
// }

// const findUserIdByUsername = async username => {
//   logger.info(`updateUser - username[${username}]`)

//   const user = await userService.findUserByUserName(username)

//   if (!user) {
//     throw new error.AppError(exceptions.exceptionType.user.userNotFound, 'userDelegate.findUserIdByUsername', [
//       { key: 'username', value: username }
//     ])
//   }
//   return user.id
// }

// const login = async (username, password) => {
//   logger.info(`login - username[${username}]`)
//   const user = await userService.login(username, password)
//   const userData = await getDataByRole(user.role, user.id)
//   userData.email = username
//   const token = generateToken(user, userData.id)

//   return { userData, role: user.role, token }
// }

// const getDataByRole = async (role, id) => {
//   logger.info(`getDataByRole - role[${role}], id[${id}]`)
//   let data
//   switch (role) {
//     case constants.users.role.CANDIDATE:
//       data = await candidateService.getCandidateByUserId(id)
//       break
//     case constants.users.role.TALENT_PARTNER:
//       data = await talentPartnerService.getTalentPartnerByUserId(id)
//       break
//     default:
//       data = {}
//       break
//   }
//   return data
// }

// const generateToken = (user, userDataId) => {
//   const payload = {
//     id: user.id,
//     username: user.username,
//     role: user.role,
//     roleId: userDataId
//   }

//   return jwt.sign(payload, config.get('auth.secret'), {
//     expiresIn: config.get('auth.tokenExpire')
//   })
// }

// const getUserByToken = async token => {
//   logger.info(`getUserByToken - token[${token}]`)

//   const user = await userService.findUserByToken(token)

//   if (!user) {
//     throw new error.AppError(exceptions.exceptionType.user.userNotFound, 'userService.getUserByToken', [
//       { key: 'token', value: token }
//     ])
//   }

//   return user
// }

// const recoverPassword = async (token, password) => {
//   logger.info(`recoverPassword - token[${token}]`)

//   const user = await userService.recoverPassword(token, password)

//   if (!user) {
//     throw new error.AppError(exceptions.exceptionType.token.tokenNotFound, 'userService.recoverPassword', [
//       { key: 'token', value: token }
//     ])
//   }

//   return user
// }

const test = saludo => {
  // loggr.info(`createUser - data[${JSON.stringify(data)}]`)

  const saludoCompleto = saludo + ` llego al delegate`;

  return saludoCompleto;

  // return userService.createUser(data)
}

module.exports = {
  test
}
