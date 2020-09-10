const chartDelegate = require('../delegates/chartDelegate')
const validators = require('../commons/validators')

const getMatchesPerMonth = async (req, res) => {
  const data = await chartDelegate.getMatchesPerMonth()
  res.json(data)
}

const getChartCategory = async (req, res) => {
  const data = await chartDelegate.getChartCategory()
  res.json(data)
}

const getUsersCreatedPerMonth = async (req, res) => {

  const data = await chartDelegate.getUsersCreatedPerMonth()
  res.json(data)
}

const getUsersReportedPerReason= async(req, res) => {

 
  const data = await chartDelegate.getUsersReportedPerReason()
  res.json(data)

}

const getCitiesPerMatch= async(req, res)=> {
  const data = await chartDelegate.getCitiesPerMatch()
  res.json(data)

}

const getCategoriesPerGender = async (req, res) =>{
  const data = await chartDelegate.getCategoriesPerGender()
  res.json(data)


}

const getUsersPerAge = async (req, res) =>{
  const data = await chartDelegate.getUsersPerAge()
  res.json(data)
}
const getUsersPerLanguages = async (req, res) =>{
  const data = await chartDelegate.getUsersPerLanguages()
  res.json(data)
}
const getUsersPerGender = async (req, res) =>{
  const data = await chartDelegate.getUsersPerGender()
  res.json(data)
}
const getMatchesPerCategories = async (req, res) =>{
  const data = await chartDelegate.getMatchesPerCategories()
  res.json(data)
}
const getCategoriesPerCity = async (req, res) =>{
  const data = await chartDelegate.getCategoriesPerCity()
  res.json(data)
}
const getMatchesPerMonthForGuide = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])
  const { userId } = req.params
  const data = await chartDelegate.getMatchesPerMonthForGuide(userId)
  res.json(data)
}
const getMatchesByStatusForGuide = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])
  const { userId } = req.params
  const data = await chartDelegate.getMatchesByStatusForGuide(userId)
  res.json(data)
}
module.exports = {
  getMatchesPerMonth,
  getChartCategory,
  getUsersCreatedPerMonth,
  getUsersReportedPerReason,
  getCitiesPerMatch,
  getCategoriesPerGender,
  getUsersPerAge,
  getUsersPerLanguages,
  getUsersPerGender,
  getMatchesPerCategories,
  getCategoriesPerCity,
  getMatchesPerMonthForGuide,
  getMatchesByStatusForGuide,
}