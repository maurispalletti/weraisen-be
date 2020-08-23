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
    'birthDate',
    'gender',
    'idFront',
    'idBack',
    'profilePicture',
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

const uploadIdentification = async (req, res) => {
  validators.validateRequiredKeys(req, ['file'])
console.log(req.file);
  const imageUrl = await userDelegate.uploadIdentification(req.file)
  // res.json(imageUrl)

  console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
  console.log(imageUrl)
  console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
  res.json(imageUrl)
}

const uploadIdImage = async (req, res) => {

  // check validation here - what to use for checking images
  // validators.validateRequiredKeys(req.body, ['email', 'password'])

  const { email, password } = req.body

  const user = await userDelegate.login(email, password)
  res.json(user)
}

const createCompliant = async (req, res) => {
  const requiredParams = [
    'userId',
    'accusedId',
    'description',
    'status',
    'reason',
  ]

  validators.validateRequiredKeys(req.body, requiredParams)

  const newCompliant = req.body

  const compliant = await userDelegate.createCompliant(newCompliant)
  res.json(compliant)
}


module.exports = {
  login,
  signup,
  findUserById,
  uploadIdentification,
  uploadIdImage,
  createCompliant,
}
