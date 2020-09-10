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

const getUsersCreatedPerMonth = async () =>{
  return userService.getUsersCreatedPerMonth()
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
const getUsersPerAge= async()=>{
  return userService.getUsersPerAge()
}
const getUsersPerLanguages= async()=>{
  return userService.getUsersPerLanguages()
}
const getUsersPerGender= async()=>{
  return userService.getUsersPerGender()
}
const getMatchesPerCategories= async()=>{
  return matchService.getMatchesPerCategories()
}
const getCategoriesPerCity= async()=>{
  return userService.getCategoriesPerCity()
}
const getMatchesPerMonthForGuide = async userId => {
  return matchService.getMatchesPerMonthForGuide(userId)
}
const getMatchesByStatusForGuide = async userId => {
  return matchService.getMatchesByStatusForGuide(userId)
}
  module.exports = {
    getMatchesPerMonth,
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
   
    // getChartCategory
  }