const matchService = require('../services/matchService')
const userService = require('../services/userService')
const compliantService = require('../services/compliantService')

//GRÁFICO CANTIDAD 
const getQuantityPerMonth = async () => {
    return matchService.getQuantityPerMonth()
  }

//GRAFICO CATEGORÍA PRO SEXO Y EDAD 
// const getChartCategory = async () => {
//   return chartService.getChartCategory()
// }

const getUsersCreatedPerMonth= async()=>{
  return userService.getUsersCreatedPerMonth()
}

const getUsersReportedPerReason= async()=>{
  return compliantService.getUsersReportedPerReason()
}

  
  module.exports = {
    getQuantityPerMonth,
    getUsersCreatedPerMonth,
    getUsersReportedPerReason

    // getChartCategory
  }