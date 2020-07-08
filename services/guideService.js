const UserModel = require('../models/userModel')
const constants = require('../commons/constants')

const registerGuide = async (userId, guide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: guide }, { new: true })
}

const toggleActive = async (userId, isActiveGuide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: { isActiveGuide } }, { new: true })
}

const getGuides = async (language, knowledge, city, fromAge, toAge, gender) => {

const año = new Date();
const añoActual = año.getFullYear()
const fromYear = añoActual - toAge;
const toYear= añoActual - fromAge;


  const query = buildMatchQuery(language, knowledge, fromYear, toYear, city, gender)

  return UserModel.find(query)
}

const buildMatchQuery = (language, knowledge, fromYear, toYear, city, gender) => {

  const query = { $and: [] }

  // Status Active
  query.$and.push({ status: constants.users.status.ACTIVE })

  // Available guides
  query.$and.push({ isActiveGuide: true })

  // City
  if (city) query.$and.push({ city })

  // Age
  if (fromYear && toYear) query.$and.push({ birthDate: { $gte: fromYear, $lte: toYear } })

  // Gender
  if (gender) query.$and.push({ gender })

  // Languages
  if (language) query.$and.push({ languages: language })

  // Knowledge
  if (knowledge) query.$and.push({ knowledge: { "$in": knowledge } })

  //Salida grupal
  

  return query
}

module.exports = {
  registerGuide,
  toggleActive,
  getGuides
}
