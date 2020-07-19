const UserModel = require('../models/userModel')
const constants = require('../commons/constants')

const registerGuide = async (userId, guide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: guide }, { new: true })
}

const toggleActive = async (userId, isActiveGuide) => {
  return UserModel.findByIdAndUpdate(userId, { $set: { isActiveGuide } }, { new: true })
}

const getGuides = async (language, knowledge, city, fromAge, toAge, gender, groupwalk, tourDay) => {

  const query = buildMatchQuery(language, knowledge, fromAge, toAge, city, gender, groupwalk, tourDay)

  return UserModel.find(query)
}

const buildMatchQuery = (language, knowledge, fromAge, toAge, city, gender, groupwalk, tourDay) => {

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

  const fechaDesde= new Date (fromYear, 01, 01)
  const fechaHasta= new Date (toYear, 01, 01)


  
  if (fechaDesde && fechaHasta) query.$and.push({ birthDate: { $gte: fechaDesde, $lte: fechaHasta } })
  console.log('FECHA DESDE: '+fechaDesde)
  console.log('FECHA HASTA: '+fechaHasta)
  // Gender
  if (gender) query.$and.push({ gender })

  // Languages

  if (language) query.$and.push({ languages: language })

  // Knowledge
  if (knowledge) query.$and.push({ knowledge: { "$in": knowledge } })

  //Salida grupal
  if (groupwalk) query.$and.push({groupwalk: true}) 


  //AvailableDays
  if (tourDay) {
    const date = new Date(tourDay)
    const dateNum = date.getDay()
    let day;
    
    if (dateNum === 6) day = 'Domingo'; 
    if (dateNum === 0) day = 'Lunes'; 
    if (dateNum === 1) day = 'Martes'; 
    if (dateNum === 2) day = 'Miércoles'; 
    if (dateNum === 3) day = 'Jueves'; 
    if (dateNum === 4) day = 'Viernes'; 
    if (dateNum === 5) day = 'Sábado'; 
  
    query.$and.push({ availableDays: day })
  }

  console.log('//'+JSON.stringify(query))

  return query
}

module.exports = {
  registerGuide,
  toggleActive,
  getGuides
}
