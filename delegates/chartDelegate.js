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

const getUsersCreatedPerMonth= async añoUsuariosCreados =>{
  return userService.getUsersCreatedPerMonth(añoUsuariosCreados)
}

const getUsersReportedPerReason = async()=>{
  return compliantService.getUsersReportedPerReason()
}

const getCitiesPerMonth= async()=>{
  return matchService.getCitiesPerMonth()
}



  
  module.exports = {
    getMatchesPerMonth,
    getUsersCreatedPerMonth,
    getUsersReportedPerReason,
    getCitiesPerMonth,
    // getChartCategory
  }