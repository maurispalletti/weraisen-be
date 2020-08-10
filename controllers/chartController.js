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
 validators.validateRequiredKeys(req.params, ['añoUsuariosCreados'])
 const {añoUsuariosCreados}= req.params
  const data = await chartDelegate.getUsersCreatedPerMonth(añoUsuariosCreados)
  res.json(data)
}

const getUsersReportedPerReason= async(req, res) => {

 
  const data = await chartDelegate.getUsersReportedPerReason()
  res.json(data)

}

const getCitiesPerMonth= async(req, res)=> {
  const data = await chartDelegate.getCitiesPerMonth()
  res.json(data)

}

module.exports = {
  getMatchesPerMonth,
  getChartCategory,
  getUsersCreatedPerMonth,
  getUsersReportedPerReason,
}