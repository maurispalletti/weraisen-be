const userService = require('../services/userService')

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

const signup = data => {
	return userService.createUser(data)
}

const login = async (username, password) => {
  return userService.login(username, password)
}

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

module.exports = {
	signup,
	login
}
