const userService = require('../services/userService')
const logger = require('../config/server/logger')
const jwt = require('jsonwebtoken')
const config = require('config')

// PUBLIC FUNCTIONS -----------------------------------------------------

const signup = async (username, password) => {
  logger.info(`userDelegate - signup - username[${username}]`)

  const user = await userService.signup(username, password)

  return generateToken(user)
}

const login = async (username, password) => {
  logger.info(`userDelegate - signup - username[${username}]`)

  const user = await userService.login(username, password)

  return generateToken(user)
}

// PRIVATE FUNCTIONS -----------------------------------------------------

const generateToken = user => {
  // Generate payload
  const payload = {
    id: user.id,
    username: user.username
  }

  // Add data to response
  const data = {
    userId: user.id,
    username: user.username
  }

  // Generate jwt with payload
  const token = jwt.sign(payload, config.get('auth.secret'), {
    expiresIn: config.get('auth.tokenExpire')
  })

  return { data, token }
}

module.exports = {
  signup,
  login
}
