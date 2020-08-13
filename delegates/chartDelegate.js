const matchService = require('../services/matchService')
const userService = require('../services/userService')
const compliantService = require('../services/compliantService')
const chartService = require('../services/chartService')

//GRÁFICO CANTIDAD 
const getMatchesPerMonth = async () => {
    return matchService.getMatchesPerMonth();
  }

//GRAFICO CATEGORÍA PRO SEXO Y EDAD 
// const getChartCategory = async () => {
//   return chartService.getChartCategory()
// }

const getUsersCreatedPerMonth= async date =>{
  return userService.getUsersCreatedPerMonth(date)
}

const getUsersReportedPerReason = async()=>{
  return compliantService.getUsersReportedPerReason()
}

const getCitiesPerMatch= async()=>{
  return matchService.getCitiesPerMatch()
}

const getCategoriesPerGender = async()=>{
  return userService.getCategoriesPerGender()
}

  
  module.exports = {
    getMatchesPerMonth,
    getUsersCreatedPerMonth,
    getUsersReportedPerReason,
    getCitiesPerMatch,
    getCategoriesPerGender,
    // getChartCategory
  }