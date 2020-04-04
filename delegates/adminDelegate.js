const userService = require('../services/userService')
const constants = require('../commons/constants')

const {
  users: {
    status: { PENDING },
  }
} = constants

const getPendingUsersList = async () => {
  return userService.findUsersByStatus(PENDING)
}

const updateUserStatus = async (userId, status) => {
  const updatedUser = await userService.updateUserStatus(userId, status)
  return updatedUser
}

module.exports = {
  getPendingUsersList,
  updateUserStatus,
}
