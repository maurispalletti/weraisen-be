const chartDelegate = require('../delegates/chartDelegate')

const getQuantityPerMonth = async (req, res) => {
  const data = await chartDelegate.getQuantityPerMonth()
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

module.exports = {
  getQuantityPerMonth,
  getChartCategory,
  getUsersCreatedPerMonth,
  getUsersReportedPerReason
}