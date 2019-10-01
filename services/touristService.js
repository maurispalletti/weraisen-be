const UserModel = require('../models/userModel')

const updateTourist = async (userId, tourist) => {
  return UserModel.findByIdAndUpdate(userId, { $set: tourist }, { new: true })
}

module.exports = {
  updateTourist
}
