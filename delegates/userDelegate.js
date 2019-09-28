const userService = require('../services/userService')

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

const signup = newUser => {
	return userService.createUser(newUser)
}

const login = async (email, password) => {
	return userService.login(email, password)
}

const findUserById = async id => {
  return userService.findUserById(id)
}

module.exports = {
	signup,
	login,
	findUserById
}
