const userDelegate = require('../delegates/userDelegate')
const validators = require('../commons/validators')

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

// Crear usuario
const signup = async (req, res) => {

  // info needed to create new user
  const requiredParams = [
    'email',
    'password',
    'fistName',
    'lastName',
    'identification',
    'age',
    'city',
    'gender',
  ]

  validators.validateRequiredKeys(req.body, requiredParams)

  const newUser = req.body

  const user = await userDelegate.signup(newUser)
  res.json({ user })
}

const login = async (req, res) => {
  validators.validateRequiredKeys(req.body, ['email', 'password'])

  const { email, password } = req.body

  const user = await userDelegate.login(email, password)
  res.json({ user })
}

module.exports = {
  login,
  signup,
}
