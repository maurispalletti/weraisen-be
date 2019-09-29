const userDelegate = require('../delegates/userDelegate')
const validators = require('../commons/validators')

const signup = async (req, res) => {

  // info needed to create new user
  const requiredParams = [
    'email',
    'password',
    'firstName',
    'lastName',
    'identification',
    'age',
    'city',
    'gender',
  ]

  console.log(req.body)

  validators.validateRequiredKeys(req.body, requiredParams)

  const newUser = req.body

  const user = await userDelegate.signup(newUser)
  res.json(user)
}

const login = async (req, res) => {
  validators.validateRequiredKeys(req.body, ['email', 'password'])

  const { email, password } = req.body

  const user = await userDelegate.login(email, password)
  res.json(user)
}

const findUserById = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['id'])

  const id = req.params.id

  const user = await userDelegate.findUserById(id)
  res.json(user)
}

module.exports = {
  login,
  signup,
  findUserById,
}
