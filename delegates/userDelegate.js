const userService = require('../services/userService')

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

const signup = newUser => {
	return userService.createUser(newUser)
}

const login = async (email, password) => {
	return userService.login(email, password)
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
