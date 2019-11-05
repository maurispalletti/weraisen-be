const matchService = require('../services/matchService')

//GRÁFICO CANTIDAD 
const getQuantityPerMonth = async () => {
    return matchService.getQuantityPerMonth()
  }

//GRAFICO CATEGORÍA PRO SEXO Y EDAD 
// const getChartCategory = async () => {
//   return chartService.getChartCategory()
// }


  
  module.exports = {
    getQuantityPerMonth,
    // getChartCategory
  }