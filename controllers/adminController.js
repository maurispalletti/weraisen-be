const adminDelegate = require('../delegates/adminDelegate')
const validators = require('../commons/validators')

const getPendingUsersList = async (req, res) => {
  const users = await adminDelegate.getPendingUsersList()
  res.json(users)
}
const getCompliantsList = async (req, res) => {
  const compliants = await adminDelegate.getCompliantsList()
  res.json(compliants)
}

const updateUserStatus = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])
  validators.validateRequiredKeys(req.body, ['status'])

  const { userId } = req.params
  const { status } = req.body

  const updatedUser = await adminDelegate.updateUserStatus(userId, status)
  res.json(updatedUser)
}

const updateCompliantStatus = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])
  validators.validateRequiredKeys(req.body, ['status'])

  const { userId } = req.params
  const { status } = req.body

  const updatedCompliant = await adminDelegate.updateCompliantStatus(userId, status)
  res.json(updatedCompliant)
}

module.exports = {
  getPendingUsersList,
  updateUserStatus,
  updateCompliantStatus,
  getCompliantsList,
}
