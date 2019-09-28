const UserModel = require('../models/userModel')
const constants = require('../commons/constants')

const registerGuide = async (userId, guide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: guide }, { new: true })
}

const toggleActive = async (userId, isActiveGuide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: { isActiveGuide } }, { new: true })
}

const getGuides = async (languages, knowledge, city, age, gender) => {
  const query = buildMatchQuery(languages, knowledge, city, age, gender)

  return UserModel.find(query)
}

const buildMatchQuery = (languages, knowledge, city, age, gender) => {

  const query = { $and: [] }

  // Status Active
  query.$and.push({ status: constants.users.status.ACTIVE })

  // Available guides
  query.$and.push({ isActiveGuide: true })

  // City
  if (city) query.$and.push({ city })

  // Age
  if (age) query.$and.push({ age })

  // Gender
  if (gender) query.$and.push({ gender })

  // Languages
  if (languages) query.$and.push({ languages })
  
  // Knowledge
  if (knowledge) query.$and.push({ knowledge })
  
  return query
}

module.exports = {
  registerGuide,
  toggleActive,
  getGuides
}
