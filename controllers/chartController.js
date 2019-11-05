const chartDelegate = require('../delegates/chartDelegate')

const getQuantityPerMonth = async (req, res) => {
  const data = await chartDelegate.getQuantityPerMonth()
  res.json(data)
}

const getChartCategory = async (req, res) => {
  const data = await chartDelegate.getChartCategory()
  res.json(data)
}

module.exports = {
  getQuantityPerMonth,
  getChartCategory
}