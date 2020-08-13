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
 validators.validateRequiredKeys(req.params, ['date'])
 const { date }= req.params
  const data = await chartDelegate.getUsersCreatedPerMonth(date)
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


module.exports = {
  getMatchesPerMonth,
  getChartCategory,
  getUsersCreatedPerMonth,
  getUsersReportedPerReason,
  getCitiesPerMatch,
  getCategoriesPerGender,
}