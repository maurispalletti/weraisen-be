const UserModel = require('../models/userModel')
const constants = require('../commons/constants')

const registerGuide = async (userId, guide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: guide }, { new: true })
}

const toggleActive = async (userId, isActiveGuide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: { isActiveGuide } }, { new: true })
}

const getGuides = async (language, knowledge, city, fromAge, toAge, gender) => {

  const query = buildMatchQuery(language, knowledge, fromAge, toAge, city, gender)

  return UserModel.find(query)
}

const buildMatchQuery = (language, knowledge, fromAge, toAge, city, gender) => {

  const query = { $and: [] }

  // Status Active
  query.$and.push({ status: constants.users.status.ACTIVE })

  // Available guides
  query.$and.push({ isActiveGuide: true })

  // City
  if (city) query.$and.push({ city })

  // Age
  const año = new Date();
  const añoActual = año.getFullYear()
  const fromYear = añoActual - toAge; // 2000
  const toYear= añoActual - fromAge; // 2005

  const fromDate = new Date(2000) 
  
  if (fromYear && toYear) query.$and.push({ birthDate: { $gte: fromYear, $lte: toYear } })

  // Gender
  if (gender) query.$and.push({ gender })

  // Languages

  if (language) query.$and.push({ language })

  // Knowledge
  if (knowledge) query.$and.push({ knowledge: { "$in": knowledge } })

  //Salida grupal
   
  console.log('//'+JSON.stringify(query))

  return query
}

module.exports = {
  registerGuide,
  toggleActive,
  getGuides
}
