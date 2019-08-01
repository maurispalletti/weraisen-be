const userDelegate = require('../delegates/userDelegate')
const validators = require('../commons/validators')

// PUBLIC FUNCTIONS -----------------------------------------------------

const signup = async (req, res) => {
  validators.validateRequiredKeys(req.body, ['username', 'password'])

  const { username, password } = req.body

  const user = await userDelegate.signup(username, password)
  res.json({ user })
}

const login = async (req, res) => {
  validators.validateRequiredKeys(req.body, ['username', 'password'])

  const { username, password } = req.body

  const user = await userDelegate.login(username, password)
  res.json({ user })
}

module.exports = {
  login,
  signup
}
